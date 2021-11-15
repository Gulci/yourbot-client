import {signIn, signOut, useSession} from 'next-auth/react'

import AppLayout from '../common/components/layouts/AppLayout'
import {AppNavProfileImage} from '../common/components/navs/AppNav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import FlavorText from '../modules/index/components/FlavorText'
import Head from 'next/head'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styled from 'styled-components'

const FlavorTextContainer = styled.div`
  min-height: 16vh;

  @media (min-width: 992px) {
    min-height: inherit;
  }
`

const IndexNav = styled.div`
  min-height: 51px;s
`

export default function Index() {
  const {data: session, status: authenticationStatus} = useSession()

  return (
    <div className="min-vh-100 text-center">
      <Head>
        <title>Your Bot Is</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="d-flex flex-column w-100 min-vh-100 p-3 mx-auto">
        <header className="mb-auto">
          <Container>
            <IndexNav className="d-flex align-items-center">
              <span className="h4 mb-0">Your Bot Is</span>
              <a
                className="ml-5"
                href="https://github.com/Gulci/yourbot-client"
                target="_blank"
                rel="noopener noreferrer">
                github
              </a>
              {authenticationStatus === 'authenticated' && (
                <div className="ml-auto">
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
                    <NavDropdown.Item
                      onClick={() => signOut({callbackUrl: '/'})}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </IndexNav>
          </Container>
        </header>

        <main>
          <Container>
            <FlavorTextContainer>
              <h1>your bot is [{<FlavorText />}]</h1>
            </FlavorTextContainer>

            {authenticationStatus !== 'authenticated' && (
              <Button
                className="mt-3"
                onClick={() => {
                  signIn('discord')
                }}
                size="lg"
                variant="discord">
                Log in with Discord
              </Button>
            )}
          </Container>
        </main>

        <footer className="mt-auto text-muted">
          client by{' '}
          <a
            href="https://github.com/gulci"
            target="_blank"
            rel="noopener noreferrer">
            gulci
          </a>
        </footer>
      </div>
    </div>
  )
}

Index.getLayout = (page) => <AppLayout hideNav={true}>{page}</AppLayout>
