import Container from 'react-bootstrap/Container'
import Link from 'next/link'

export default function AppFooter() {
  return (
    <footer className="mt-auto text-muted pb-3">
      {' '}
      <Container>
        <Link href="/privacy">
          <a className="me-3">privacy</a>
        </Link>
        <Link href="/tos">
          <a>terms of service</a>
        </Link>
      </Container>
    </footer>
  )
}
