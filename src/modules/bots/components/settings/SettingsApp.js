import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import SettingsSideNav from './navs/SettingsSideNav'

export default function SettingsApp({children}) {
  return (
    <Container>
      <Row>
        <Col lg="4">
          <SettingsSideNav />
        </Col>
        <Col lg="8">{children}</Col>
      </Row>
    </Container>
  )
}
