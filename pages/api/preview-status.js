export default function handler(req, res) {
  const inPreview = !!req.previewData
  res.status(200).json({ inPreview })
}