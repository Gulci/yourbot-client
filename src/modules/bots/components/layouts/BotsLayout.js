import BotsNav from '../navs/BotsNav'
import {getLayout as getAppLayout} from '../../../../common/components/layouts/AppLayout'

const BotsLayout = ({children}) => <>{children}</>

// The purpose of this function is to allow us to return a complex nested tree of layouts
// https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
export const getLayout = (page) =>
  getAppLayout(
    <BotsLayout>
      <BotsNav />
      {page}
    </BotsLayout>,
  )

export default BotsLayout
