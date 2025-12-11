import articles from '../data/articles.json'

function Rss() {}

export async function getServerSideProps({ res }) {
  const base = 'https://novusexchange.com'
  const items = articles
    .map(a => `
  <item>
    <title><![CDATA[${a.title}]]></title>
    <link>${base}/article/${a.slug}</link>
    <guid>${base}/article/${a.slug}</guid>
    <description><![CDATA[${a.description}]]></description>
    <pubDate>${new Date(a.date).toUTCString()}</pubDate>
  </item>`)
    .join('\n')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Novus Exchange</title>
  <link>${base}</link>
  <description>Critical analysis for a complex world.</description>
${items}
</channel>
</rss>`
  res.setHeader('Content-Type', 'text/xml')
  res.write(body)
  res.end()
  return { props: {} }
}

export default Rss
