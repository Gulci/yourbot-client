import BotStatusIcon from '../../modules/bots/components/BotStatusIcon'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import classNames from 'classnames'
import {getLayout} from '../../modules/bots/components/layouts/BotsLayout'
import useBots from '../../modules/bots/hooks/useBots'

export default function Bots() {
  const {bots, isLoading, isError} = useBots()

  return (
    <section className="py-4">
      <Container>
        <Row className="mb-4">
          {!isLoading &&
            !isError &&
            bots.map((bot, i) => (
              <Col
                className={classNames({'mb-3': i < bots.length - 1})}
                lg="4"
                key={bot.id}>
                <Card>
                  <Card.Body>
                    <Card.Title className="d-flex align-items-center">
                      <BotStatusIcon
                        className="me-2"
                        status={bot.deploy_status}
                      />
                      {bot.name}
                    </Card.Title>
                    <Link href={`bots/${bot.id}`} passHref>
                      <Button className="mt-3" variant="primary">
                        Manage bot
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <Button disabled variant="success" size="lg">
          Create a bot
        </Button>
      </Container>
    </section>
  )
}

Bots.auth = true
Bots.getLayout = getLayout
