import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CodeFileNav from './navs/CodeFileNav'

export default function CodeApp({children}) {
  return (
    <Container>
      <Row>
        <Col lg="2">
          <CodeFileNav />
        </Col>
        <Col lg="10">{children}</Col>
      </Row>
    </Container>
  )
}
