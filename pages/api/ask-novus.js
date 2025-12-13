import fs from 'fs'
import os from 'os'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  const { prompt, imageData, mimeType } = req.body
  if (!prompt && !imageData) {
    res.status(400).json({ error: 'Missing prompt or imageData' })
    return
  }
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const tmpPath = path.join(os.tmpdir(), `gcp-sa-${Date.now()}.json`)
      fs.writeFileSync(tmpPath, process.env.GOOGLE_SERVICE_ACCOUNT_JSON, { encoding: 'utf8' })
      process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpPath

      // Clean up temp file on process exit
      if (!global.__gcpCleanupRegistered) {
        global.__gcpCleanupRegistered = true
        process.on('exit', () => {
          try { fs.unlinkSync(tmpPath) } catch { }
        })
      }
    } catch { }
  }
  const hasOpenAI = !!process.env.OPENAI_API_KEY
  const hasGemini = !!process.env.GEMINI_API_KEY
  const hasVertex = !!process.env.VERTEX_PROJECT_ID && !!process.env.VERTEX_LOCATION

  let provider = process.env.AI_PROVIDER
  if (!provider) {
    if (hasVertex) provider = 'vertex'
    else if (hasGemini) provider = 'gemini'
    else provider = 'vertex' // Default to vertex for fallback message
  }
  try {
    if (imageData && mimeType) {
      if (provider === 'vertex' && hasVertex) {
        const { VertexAI } = await import('@google-cloud/vertexai')
        const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location: process.env.VERTEX_LOCATION })
        const model = vertex.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const result = await model.generateContent([prompt || 'Analyze this image.', { inlineData: { data: imageData, mimeType } }])
        const reply = result.response?.text() || ''
        res.status(200).json({ text: reply })
        return
      }
      if (provider === 'gemini' && hasGemini) {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const result = await model.generateContent([
          prompt || 'Analyze this image.',
          { inlineData: { data: imageData, mimeType } }
        ])
        const reply = result.response?.text() || ''
        res.status(200).json({ text: reply })
        return
      }
      res.status(400).json({ error: 'Image analysis requires Vertex or Gemini provider' })
      return
    }

    const wantsImage = typeof prompt === 'string' && /^(image:|generate an image( of)?|create an image( of)?)/i.test(String(prompt).trim())
    if (wantsImage) {
      if (provider === 'vertex' && hasVertex) {
        const { VertexAI } = await import('@google-cloud/vertexai')
        async function gen(location) {
          const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location })
          const model = vertex.getGenerativeModel({ model: 'imagen-3.0-generate-002' })
          const result = await model.generateContent(prompt)
          const parts = result.response?.candidates?.[0]?.content?.parts || []
          const imgPart = parts.find(p => p.inlineData && p.inlineData.data)
          const b64 = imgPart?.inlineData?.data || ''
          const mt = imgPart?.inlineData?.mimeType || 'image/png'
          const imageUrl = b64 ? `data:${mt};base64,${b64}` : null
          return { imageUrl }
        }
        let out
        try {
          out = await gen(process.env.VERTEX_LOCATION)
        } catch {
          out = await gen('us-central1')
        }
        res.status(200).json({ text: out.imageUrl ? 'Image generated' : 'Failed to generate image', imageUrl: out.imageUrl })
        return
      }
      if (provider === 'gemini') {
        res.status(400).json({ error: 'Image generation not available for Gemini provider' })
        return
      }
      res.status(400).json({ error: 'Image generation requires Vertex provider' })
      return
    }

    if (provider === 'vertex' && hasVertex) {
      const { VertexAI } = await import('@google-cloud/vertexai')
      const vertex = new VertexAI({ project: process.env.VERTEX_PROJECT_ID, location: process.env.VERTEX_LOCATION })
      const model = vertex.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      const reply = result.response?.text() || ''
      res.status(200).json({ text: reply })
      return
    }
    if (provider === 'gemini' && hasGemini) {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      const reply = result.response?.text() || ''
      res.status(200).json({ text: reply })
      return
    }

    // Fallback if no provider is configured
    if (!hasVertex && !hasGemini) {
      const mockReply = "I am currently running in demo mode (no AI provider configured). I can help you navigate Novus Exchange, but real-time analysis is unavailable."
      res.status(200).json({ text: mockReply })
      return
    }

    res.status(400).json({ error: 'Text generation requires Vertex or Gemini provider' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI service unavailable' })
  }
}
