import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function AskNovus() {
  const [messages, setMessages] = useState([{ id: '1', sender: 'ai', text: 'Ask a question, or type "image: ..." / "generate an image of ...".' }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startListening = () => {
    if (typeof window === 'undefined') return
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      setIsListening(true)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(prev => prev + (prev ? ' ' : '') + transcript)
        setIsListening(false)
      }
      recognition.onerror = () => { setIsListening(false) }
      recognition.onend = () => { setIsListening(false) }
      recognition.start()
    } else {
      alert('Voice input is not supported in this browser.')
    }
  }

  const callApi = async (payload) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/ask-novus', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to get response')
      }
      const data = await response.json()
      return data
    } catch (err) {
      setError(err.message)
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: `Sorry, I encountered an error: ${err.message}`, type: 'error' }])
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const userMessage = { id: Date.now().toString(), sender: 'user', text: input, type: 'text' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    const result = await callApi({ prompt: userMessage.text })
    if (result) {
      const aiMsg = { id: Date.now().toString(), sender: 'ai', text: result.text, imageUrl: result.imageUrl, type: result.imageUrl ? 'image' : 'text' }
      setMessages(prev => [...prev, aiMsg])
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file || isLoading) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = String(reader.result).split(',')[1]
      const mimeType = file.type
      const userMessage = { id: Date.now().toString(), sender: 'user', text: `Analyzing image: ${file.name}`, imageUrl: URL.createObjectURL(file), type: 'image_upload' }
      setMessages(prev => [...prev, userMessage])
      const result = await callApi({ prompt: 'Analyze this image and provide a detailed description.', imageData: base64Image, mimeType })
      if (result) {
        const aiMsg = { id: Date.now().toString(), sender: 'ai', text: result.text, type: 'text' }
        setMessages(prev => [...prev, aiMsg])
      }
    }
    reader.onerror = () => { setError('Failed to read the image file.') }
  }

  return (
    <section id="ask-novus" className="min-h-screen py-32 bg-black reveal scroll-mt-24 snap-start">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-5xl font-black mb-6 text-center drop-shadow-lg">Ask Novus</h2>
        <p className="text-xl text-white/70 mb-12 text-center max-w-2xl mx-auto font-light">Your AI-powered research assistant. Ask about global trends, market analysis, or request an image.</p>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.1)] h-[70vh] flex flex-col overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="flex-grow p-8 overflow-y-auto space-y-6">
            <div className="flex">
              <div className="bg-white/5 text-white p-4 rounded-2xl rounded-tl-none max-w-md shadow-lg border border-white/5">
                <p>Hello! How can I help you analyze the world today?</p>
              </div>
            </div>
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'error' ? (
                  <div className="bg-red-900/80 text-white p-4 rounded-2xl shadow-lg border border-red-500/30 max-w-md"><p>{msg.text}</p></div>
                ) : msg.type === 'image_upload' ? (
                  <div className="bg-white/10 p-4 rounded-2xl max-w-md shadow-lg border border-white/5 backdrop-blur-sm"><p className="text-xs uppercase tracking-widest text-white/50 mb-2">Uploaded</p><Image src={msg.imageUrl} alt="Uploaded image" width={600} height={400} className="rounded-xl border border-white/10" unoptimized /></div>
                ) : msg.type === 'image' ? (
                  <div className="bg-white/5 text-white p-4 rounded-2xl rounded-tl-none max-w-md shadow-lg border border-white/5"><p className="text-sm italic text-white/80 mb-3">{msg.text}</p><Image src={msg.imageUrl} alt="Generated image" width={600} height={400} className="rounded-xl border border-white/10 shadow-inner" unoptimized /><div className="mt-2 flex gap-2"><button className="px-2 py-1 text-xs rounded bg-white/10" onClick={() => speakText(msg.text)}>Listen</button><button className="px-2 py-1 text-xs rounded bg-white/10" onClick={stopSpeak}>Stop</button></div></div>
                ) : (
                  <div className={`${msg.sender === 'user' ? 'bg-[var(--accent)] text-white rounded-tr-none' : 'bg-white/5 rounded-tl-none'} text-white p-4 rounded-2xl max-w-md shadow-lg border border-white/5 backdrop-blur-sm`}><p>{msg.text}</p>{msg.sender !== 'user' && <div className="mt-2 flex gap-2"><button className="px-2 py-1 text-xs rounded bg-white/10" onClick={() => speakText(msg.text)}>Listen</button><button className="px-2 py-1 text-xs rounded bg-white/10" onClick={stopSpeak}>Stop</button></div>}</div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex items-center space-x-3 bg-white/5 rounded-full p-1.5 border border-white/10 shadow-inner">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" disabled={isLoading} />
              <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} disabled={isLoading} className="p-3 text-white/60 hover:text-[var(--accent)] disabled:opacity-50 transition-colors hover:bg-white/5 rounded-full" aria-label="Attach image">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.415a6 6 0 108.485 8.485L17 13" /></svg>
              </button>
              <button type="button" onClick={startListening} disabled={isLoading} className={`p-3 text-white/60 hover:text-[var(--accent)] transition-colors hover:bg-white/5 rounded-full ${isListening ? 'pulse-ring' : ''}`} aria-label="Voice input">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a4 4 0 00-4 4v6a4 4 0 108 0V5a4 4 0 00-4-4zm0 14c-3.314 0-6-2.239-6-5h2c0 2.209 1.791 4 4 4s4-1.791 4-4h2c0 2.761-2.686 5-6 5zm-1 5h2v3h-2v-3z"/></svg>
              </button>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isLoading ? 'Thinking...' : "Ask a question, or start with 'image:' to generate."} className="flex-grow bg-transparent text-white px-2 focus:outline-none placeholder-white/30 text-sm" disabled={isLoading} />
              <button type="submit" className="bg-[var(--accent)] text-black rounded-full p-3 hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:shadow-none transform hover:scale-105" disabled={isLoading || !input.trim()} aria-label="Send message">
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </form>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Novus AI can make mistakes. Please verify important information. We do not collect data from this chat.</p>
      </div>
    </section>
  )
}
  function speakText(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    synth.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    const voices = synth.getVoices()
    const preferred = voices.find(v => v.lang.startsWith('en') && /Google|Microsoft|Natural|Neural/i.test(v.name)) || voices.find(v => v.lang.startsWith('en'))
    if (preferred) utter.voice = preferred
    utter.rate = 0.95
    utter.pitch = 1.05
    utter.volume = 1
    synth.speak(utter)
  }

  function stopSpeak() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
  }
