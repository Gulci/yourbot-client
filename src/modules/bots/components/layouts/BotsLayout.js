import BotsNav from '../navs/BotsNav'
import {getLayout as getAppLayout} from '../../../../common/components/layouts/AppLayout'

const BotsLayout = ({children}) => <>{children}</>

export const getLayout = (page) =>
  getAppLayout(
    <BotsLayout>
      <BotsNav />
      {page}
    </BotsLayout>,
  )

export default BotsLayout
