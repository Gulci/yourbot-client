import Container from 'react-bootstrap/Container'
import {getLayout} from '../../modules/bots/components/layouts/BotsLayout'
import useBot from '../../modules/bots/hooks/useBot'
import {useRouter} from 'next/router'

export default function Bot() {
  const router = useRouter()
  const {botId} = router.query

  const {bot, isLoading, isError} = useBot(botId)

  return (
    <Container>
      <section className="py-4">
        <pre>
          <code>{JSON.stringify(bot)}</code>
        </pre>
      </section>
    </Container>
  )
}

Bot.auth = true
Bot.getLayout = getLayout
