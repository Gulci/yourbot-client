import Container from 'react-bootstrap/Container'

export default function DisplayTitle({title}) {
  return (
    <section className="border-top border-bottom py-5">
      <Container>
        <h1>{title}</h1>
      </Container>
    </section>
  )
}
