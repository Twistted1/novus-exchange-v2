export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })
  let { email } = req.body
  email = (email || '').trim()
  if (!email) return res.status(400).json({ error: 'Missing email' })
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) return res.status(400).json({ error: 'Invalid email' })
  try {
    const r = await fetch('https://formspree.io/f/xnngvoyw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    if (!r.ok) throw new Error('Formspree error')
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to subscribe' })
  }
}
