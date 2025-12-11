import articles from '../data/articles.json'

function Sitemap() {}

export async function getServerSideProps({ res }) {
  const base = 'https://novusexchange.com'
  const urls = [
    '', 'article', 'ask-novus'
  ].map(p => `${base}/${p}`)
  const articleUrls = articles.map(a => `${base}/article/${a.slug}`)
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls, ...articleUrls].map(u => `<url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`
  res.setHeader('Content-Type', 'text/xml')
  res.write(body)
  res.end()
  return { props: {} }
}

export default Sitemap
