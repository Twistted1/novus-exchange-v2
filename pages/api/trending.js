import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' })
  try {
    // Stub: replace with real news API (NewsAPI, GNews, etc)
    const headlines = [
      'Global markets dip on inflation data',
      'AI regulation bill advances in EU parliament',
      'Big Tech earnings beat expectations'
    ]
    const prompt = `Summarize these headlines in 2 sentences each, critical tone:\n${headlines.join('\n')}`
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7
    })
    const summary = completion.choices[0].message.content
    res.status(200).json({ summary })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI service unavailable' })
  }
}