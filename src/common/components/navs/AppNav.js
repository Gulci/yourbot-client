import {signOut, useSession} from 'next-auth/react'

import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'
import {useMediaQuery} from '@react-hook/media-query'

export const AppNavProfileImage = styled(Image)`
  max-width: 35px;
`

export default function AppNav(props) {
  const {data: session, status: authenticationStatus} = useSession()
  const userPrefersLight = useMediaQuery('(prefers-color-scheme: light)')

  return (
    <Navbar
      bg={!userPrefersLight ? 'dark' : 'light'}
      variant={!userPrefersLight && 'dark'}
      expand="lg"
      {...props}>
      <Container>
        <Navbar.Brand href="/">Your Bot Is</Navbar.Brand>
        {authenticationStatus === 'authenticated' && (
          <>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown
                id="user-dropdown"
                title={
                  <>
                    <AppNavProfileImage
                      alt={`${session.user.name}'s profile photo'`}
                      className="mr-2"
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
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  )
}
