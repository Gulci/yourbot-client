import AppFooter from '../AppFooter'
import AppMeta from '../metas/AppMeta'
import AppNav from '../navs/AppNav'

const AppLayout = ({children, hideFooter = false, hideNav = false}) => (
  <>
    <AppMeta />

    {!hideNav && <AppNav />}
    <main className="min-vh-100">{children}</main>
    {!hideFooter && <AppFooter />}
  </>
)

// The purpose of this function is to allow us to return a complex nested tree of layouts
// https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
export const getLayout = (page) => <AppLayout>{page}</AppLayout>

export default AppLayout
