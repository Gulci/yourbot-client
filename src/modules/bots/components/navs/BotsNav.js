import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function BotsNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link href="/bots" passHref>
          <Nav.Link className="ps-0">Bots</Nav.Link>
        </Link>
      </Container>
    </Navbar>
  )
}
