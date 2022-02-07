import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DisplayTitle from '../../../common/components/DisplayTitle'
import BotInviteButton from '../../../modules/bots/components/BotInviteButton'
import { getLayout } from '../../../modules/bots/components/layouts/BotsLayout'
import useBot from '../../../modules/bots/hooks/useBot'

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
      <DisplayTitle>
        <h1>{bot.name}</h1>
        <div className="ms-auto">
          <BotInviteButton clientId={bot.application_id} />
        </div>
      </DisplayTitle>
      <section className="py-4">
        <Container>
          <Row></Row>
        </Container>
      </section>
    </>
  ) : null
}

Bot.auth = true
Bot.getLayout = getLayout
