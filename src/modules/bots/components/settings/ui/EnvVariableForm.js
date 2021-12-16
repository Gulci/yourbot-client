import {Field, Formik} from 'formik'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {EnvVariableSchema} from '../../../schemas'
import Form from 'react-bootstrap/Form'
import {useRouter} from 'next/router'
import {useSWRConfig} from 'swr'
import {useState} from 'react'

export default function EnvVariableForm() {
  const router = useRouter()
  const {botId} = router.query

  const {mutate} = useSWRConfig()

  const [success, setSuccess] = useState(false)

  return (
    <Formik
      initialValues={{key: '', value: ''}}
      validateOnMount={true}
      validationSchema={EnvVariableSchema}
      onSubmit={async (values, actions) => {
        setSuccess(false)

        mutate(
          `/api/dashboard/bots/${botId}/environment_variables`,
          async (envVars) => {
            const newEnvVar = await (
              await fetch(
                `/api/dashboard/bots/${botId}/environment_variables/`,
                {
                  method: 'POST',
                  body: JSON.stringify(values),
                },
              )
            ).json()

            return [...envVars, newEnvVar]
          },
        )

        setSuccess(true)
        actions.resetForm()
        actions.validateForm()
      }}>
      {({errors, handleSubmit, handleChange, isValid}) => (
        <Card>
          <Form
            onChange={(e) => {
              if (success) setSuccess(false)
              handleChange(e)
            }}
            onSubmit={handleSubmit}>
            <Card.Body>
              <Card.Title>Add New Environment Variable</Card.Title>
              <Field name="key" required>
                {({field}) => (
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control {...field}></Form.Control>
                  </Form.Group>
                )}
              </Field>
              <Field name="value" required>
                {({field}) => (
                  <Form.Group className="my-3">
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...field}></Form.Control>
                  </Form.Group>
                )}
              </Field>
              {errors.name && (
                <div className="mt-3 text-danger">{errors.name}</div>
              )}
            </Card.Body>
            <Card.Footer className="d-flex align-items-center">
              {success && <span className="text-success">Created!</span>}
              <Button
                className="ms-auto"
                disabled={!isValid}
                type="submit"
                variant="primary">
                Add
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      )}
    </Formik>
  )
}
