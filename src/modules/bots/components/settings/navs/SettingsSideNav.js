import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import {SETTINGS_PAGES} from '../../../constants'
import {useRouter} from 'next/router'

export default function SettingsSideNav() {
  const router = useRouter()
  const {botId, settings} = router.query

  return (
    <Nav className="flex-column">
      <Link href={`/bots/${botId}/settings/${SETTINGS_PAGES.GENERAL}`} passHref>
        <Nav.Link
          active={
            settings === undefined || settings[0] === SETTINGS_PAGES.GENERAL
          }
          className="ps-0">
          General
        </Nav.Link>
      </Link>
      <Link href={`/bots/${botId}/settings/${SETTINGS_PAGES.DISCORD}`} passHref>
        <Nav.Link
          active={settings && settings[0] === SETTINGS_PAGES.DISCORD}
          className="ps-0">
          Discord Application
        </Nav.Link>
      </Link>
      <Link
        href={`/bots/${botId}/settings/${SETTINGS_PAGES.ENV_VARIABLES}`}
        passHref>
        <Nav.Link
          active={settings && settings[0] === SETTINGS_PAGES.ENV_VARIABLES}
          className="ps-0">
          Environment Variables
        </Nav.Link>
      </Link>
    </Nav>
  )
}
