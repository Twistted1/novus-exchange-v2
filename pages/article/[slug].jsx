import { useRouter } from 'next/router'
import Head from 'next/head'
import articles from '../../data/articles.json'

export default function Article({ post }) {
  if (!post) return <div className="min-h-screen flex items-center justify-center">Not Found</div>
  return (
    <>
      <Head>
        <title>{post.title} | Novus Exchange</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://novusexchange.com/article/${post.slug}`} />
        <meta property="og:image" content="https://novusexchange.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@NovusExchange" />
        <link rel="canonical" href={`https://novusexchange.com/article/${post.slug}`} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article', headline: post.title,
          description: post.description, datePublished: post.date, author: { '@type': 'Person', name: 'Marcio Novus' },
          mainEntityOfPage: `https://novusexchange.com/article/${post.slug}`
        }) }} />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0e1526] to-[#0b1220] text-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-xs uppercase tracking-wide text-indigo-300">{post.tag}</div>
          <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
          <div className="mt-3 text-gray-300">By Marcio Novus • {post.read} read • {post.date}</div>
          <div className="mt-6 prose prose-invert max-w-none font-serif">
            <p>{post.body}</p>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = articles.find(a => a.slug === params.slug) || null
  return { props: { post } }
}

export async function getStaticPaths() {
  const paths = articles.map(a => ({ params: { slug: a.slug } }))
  return { paths, fallback: false }
}
