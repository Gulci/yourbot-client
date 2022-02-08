import { useRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DisplayTitle from '../../../common/components/DisplayTitle'
import { getLayout } from '../../../modules/bots/components/layouts/BotsLayout'
import useBot from '../../../modules/bots/hooks/useBot'

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
