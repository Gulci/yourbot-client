import '../../theme/dist/bootstrap.min.css'
import '../../theme/dist/yourbot-bootstrap.min.css'

import AppLayout from '../common/components/layouts/AppLayout'
import Auth from '../modules/auth/components/auth'
import {SessionProvider} from 'next-auth/react'

export default function YourBotApp({
  Component,
  pageProps: {session, ...pageProps},
}) {
  // Use the layout defined at the page level, if available;
  // otherwise use default layout
  const getLayout =
    Component.getLayout || ((page) => <AppLayout>{page}</AppLayout>)

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </SessionProvider>
  )
}
