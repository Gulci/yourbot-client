import Head from 'next/head'

export default function AppMeta() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* Inform the browser that this page supports both dark
      and light color schemes, and the page author prefers dark. */}
      <meta name="color-scheme" content="dark light" />

      <title>Your Bot Is</title>
    </Head>
  )
}
