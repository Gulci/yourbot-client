import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import DisplayTitle from '../../../common/components/DisplayTitle'
import Row from 'react-bootstrap/Row'
import dynamic from 'next/dynamic'
import {getLayout} from '../../../modules/bots/components/layouts/BotsLayout'
import useBot from '../../../modules/bots/hooks/useBot'
import {useRouter} from 'next/router'

const CodeEditor = dynamic(
  () => import('../../../modules/bots/components/CodeEditor'),
  {ssr: false},
)

export default function Bot() {
  const router = useRouter()
  const {botId} = router.query

  const {bot, isLoading, isError} = useBot(botId)

  return bot ? (
    <>
      <DisplayTitle title={bot.name} />
      <section className="py-4">
        <Container>
          <Row></Row>
        </Container>
      </section>
    </>
  ) : null
}

Bot.auth = true
Bot.displayTitle = 'Your Bot'
Bot.getLayout = getLayout
