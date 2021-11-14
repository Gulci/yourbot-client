import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import {useMediaQuery} from '@react-hook/media-query'

export default function AppNav() {
  const userPrefersLight = useMediaQuery('(prefers-color-scheme: light)')

  return (
    <Navbar
      bg={!userPrefersLight ? 'dark' : 'light'}
      variant={!userPrefersLight && 'dark'}
      expand="lg">
      <Container>
        <Navbar.Brand>Your Bot Is</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
