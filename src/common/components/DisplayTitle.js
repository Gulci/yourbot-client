import Container from 'react-bootstrap/Container'

export default function DisplayTitle({children}) {
  return (
    <section className="border-top border-bottom py-5">
      <Container className="d-flex align-items-center">{children}</Container>
    </section>
  )
}
