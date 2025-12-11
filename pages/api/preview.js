export default function handler(req, res) {
  const { secret } = req.query
  if (secret !== process.env.PREVIEW_SECRET) return res.status(401).json({ error: 'Invalid token' })
  res.setPreviewData({})
  res.redirect(307, '/')
}