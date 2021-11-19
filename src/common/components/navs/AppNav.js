import {signOut, useSession} from 'next-auth/react'

import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'

export const AppNavProfileImage = styled(Image)`
  max-width: 35px;
`

export default function AppNav(props) {
  const {data: session, status: authenticationStatus} = useSession()

  return (
    <Navbar bg="dark" variant="dark" expand="lg" {...props}>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand href="/">Your Bot Is</Navbar.Brand>
        </Link>
        {authenticationStatus === 'authenticated' && (
          <>
            <Navbar.Toggle aria-controls="user-profile-nav" />
            <Navbar.Collapse
              className="justify-content-end"
              id="user-profile-nav">
              <Nav>
                <NavDropdown
                  id="user-dropdown"
                  title={
                    <>
                      <AppNavProfileImage
                        alt={`${session.user.name}'s profile photo'`}
                        className="me-2"
                        src={session.user.image}
                        roundedCircle
                      />
                      {session.user.name}
                    </>
                  }>
                  <NavDropdown.Item onClick={() => signOut({callbackUrl: '/'})}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  )
}
