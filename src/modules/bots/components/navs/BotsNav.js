import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import useBot from '../../hooks/useBot'
import {useRouter} from 'next/router'

export default function BotsNav() {
  const router = useRouter()
  const {botId, settings} = router.query
  const {bot} = useBot(botId)
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Nav className="flex-row">
            <Nav.Item>
              <Link href="/bots" passHref>
                <Nav.Link
                  active={router.pathname.startsWith('/bots')}
                  className="ps-0 pe-2">
                  Bots
                </Nav.Link>
              </Link>
            </Nav.Item>
            {bot && (
              <>
                <span className="navbar-text px-2">/</span>
                <span className="navbar-text px-2">{bot.name}</span>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      {bot && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Nav className="flex-row">
              <Nav.Item className="me-3">
                <Link href={`/bots/${bot.id}`} passHref>
                  <Nav.Link
                    active={router.pathname === `/bots/[botId]`}
                    className="ps-0 pe-2">
                    Overview
                  </Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item className="me-3">
                <Link href={`/bots/${bot.id}/code`} passHref>
                  <Nav.Link
                    active={router.pathname === `/bots/[botId]/code`}
                    className="ps-0 pe-2">
                    Source Code
                  </Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href={`/bots/${bot.id}/settings`} passHref>
                  <Nav.Link
                    active={router.pathname === `/bots/[botId]/settings`}
                    className="ps-0 pe-2">
                    Settings
                  </Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  )
}
