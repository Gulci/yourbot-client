import Container from 'react-bootstrap/Container'
import {micromark} from 'micromark'
import privacyMd from '../modules/privacy/assets/privacy.md'

export default function Privacy() {
  return (
    <section className="py-4">
      <Container
        dangerouslySetInnerHTML={{__html: micromark(privacyMd)}}></Container>
    </section>
  )
}
