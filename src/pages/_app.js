import '../../theme/dist/bootstrap.min.css'
import '../../theme/dist/yourbot-bootstrap.min.css'

import AppLayout from '../common/components/layouts/AppLayout'

export default function YourBotApp({Component, pageProps}) {
  // Use the layout defined at the page level, if available;
  // otherwise use default layout
  const getLayout =
    Component.getLayout || ((page) => <AppLayout>{page}</AppLayout>)

  return getLayout(<Component {...pageProps} />)
}
