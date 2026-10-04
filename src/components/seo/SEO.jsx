import { Helmet } from 'react-helmet-async'
import { site } from '../../data/site'

export default function SEO({ title, description, path = '/', type = 'website' }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Full Stack Developer`
  const url = `${site.url}${path}`
  const desc = description || `${site.role} specializing in MERN stack, REST APIs, and cloud-deployed web applications.`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.url}/image%20dev.jpeg`} />
      <meta property="og:site_name" content={`${site.name} Portfolio`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${site.url}/image%20dev.jpeg`} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: `${site.name} Portfolio`,
          url: site.url,
          author: { '@type': 'Person', name: site.name },
          description: desc,
        })}
      </script>
    </Helmet>
  )
}
