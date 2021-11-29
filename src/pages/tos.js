import Container from 'react-bootstrap/Container'
import {micromark} from 'micromark'
import tosMd from '../modules/tos/assets/tos.md'

export default function TermsOfService() {
  return (
    <section className="py-4">
      <Container
        dangerouslySetInnerHTML={{__html: micromark(tosMd)}}></Container>
    </section>
  )
}
