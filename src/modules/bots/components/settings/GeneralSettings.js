import {Field, Formik} from 'formik'

import {BotNameSettingsSchema} from '../../schemas'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import useBot from '../../hooks/useBot'
import {useRouter} from 'next/router'
import {useSWRConfig} from 'swr'
import {useState} from 'react'

export default function GeneralSettings() {
  const router = useRouter()
  const {botId} = router.query

  const {bot, isLoading, isError} = useBot(botId)
  const {mutate} = useSWRConfig()

  const [success, setSuccess] = useState(false)

  return bot ? (
    <>
      <Formik
        initialValues={{name: bot.name}}
        validationSchema={BotNameSettingsSchema}
        onSubmit={async (values) => {
          setSuccess(false)

          const response = await fetch(`/api/dashboard/bots/${botId}/`, {
            body: JSON.stringify({
              application_id: bot.application_id,
              public_key: bot.public_key,
              token: bot.token,
              ...values,
            }),
            method: 'PATCH',
          })

          if (response.ok) {
            const responseData = await response.json()
            mutate(
              `/api/dashboard/bots/${botId}`,
              {...bot, ...responseData},
              false,
            )
            setSuccess(true)
          }
        }}>
        {({dirty, errors, handleSubmit, handleChange, isValid}) => (
          <Card>
            <Form
              onChange={(e) => {
                if (success) setSuccess(false)
                handleChange(e)
              }}
              onSubmit={handleSubmit}>
              <Card.Body>
                <Card.Title>Bot Name</Card.Title>
                <Card.Subtitle>
                  Unique name for your bot on this platform
                </Card.Subtitle>
                <Field name="name" required>
                  {({field}) => (
                    <Form.Group className="mt-3">
                      <Form.Label>Bot name</Form.Label>
                      <Form.Control {...field}></Form.Control>
                    </Form.Group>
                  )}
                </Field>
                {errors.name && (
                  <div className="mt-3 text-danger">{errors.name}</div>
                )}
              </Card.Body>
              <Card.Footer className="d-flex align-items-center">
                {success && <span className="text-success">Updated!</span>}
                <Button
                  className="ms-auto"
                  disabled={!isValid}
                  type="submit"
                  variant="primary">
                  Save
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  ) : null
}
