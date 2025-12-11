export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })
  let { name, email, message } = req.body
  name = (name || '').trim()
  email = (email || '').trim()
  message = (message || '').trim()
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) return res.status(400).json({ error: 'Invalid email' })
  if (name.length < 2 || message.length < 3) return res.status(400).json({ error: 'Invalid input' })
  try {
    const r = await fetch('https://formspree.io/f/mdkwzpjv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
    if (!r.ok) throw new Error('Formspree error')
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send' })
  }
}
