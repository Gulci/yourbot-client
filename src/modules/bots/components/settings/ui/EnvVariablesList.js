import {Field, Formik} from 'formik'
import {forwardRef, useState} from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import {EnvVariableSchema} from '../../../schemas'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import {ThreeDotsVertical} from 'react-bootstrap-icons'
import {useRouter} from 'next/router'
import {useSWRConfig} from 'swr'

const EnvVariableMenuToggle = forwardRef(({onClick}, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}>
    <ThreeDotsVertical className="text-body" />
  </a>
))
EnvVariableMenuToggle.displayName = 'EnvVariableMenuToggle'

export default function EnvVariablesList({envVars}) {
  const router = useRouter()
  const {mutate} = useSWRConfig()
  const [editingEnvVar, setEditingEnvVar] = useState(null)
  const [successId, setSuccessId] = useState(null)
  const [deletingEnvVar, setDeletingEnvVar] = useState(null)

  const {botId} = router.query

  function deleteEnvVar(id) {
    mutate(
      `/api/dashboard/bots/${botId}/environment_variables`,
      async (envVars) => {
        await fetch(
          `/api/dashboard/bots/${botId}/environment_variables/${id}`,
          {
            method: 'DELETE',
          },
        )

        const filteredEnvVars = envVars.filter((envVar) => envVar.id !== id)
        return filteredEnvVars
      },
    )
    setDeletingEnvVar(null)
  }

  return (
    <ListGroup>
      {envVars.map((envVar, index) => (
        <ListGroup.Item className="px-4 py-3" key={index}>
          <Row className="align-items-center">
            <Col lg={6}>
              <strong>
                <small className="text-uppercase">Name</small>
              </strong>
              <strong className="me-5 d-block text-truncate">
                {envVar.key}
              </strong>
            </Col>
            <Col lg={5}>
              <div className="d-flex flex-column">
                <strong>
                  <small className="text-uppercase">Value</small>
                </strong>
                <span className="d-block text-truncate">{envVar.value}</span>
              </div>
            </Col>
            <Col className="d-flex justify-content-lg-end" lg={1}>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={EnvVariableMenuToggle}
                  id="environment-variable-menu">
                  <ThreeDotsVertical />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setEditingEnvVar(envVar.id)
                      setSuccessId(false)
                    }}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => {
                      setDeletingEnvVar(envVar.id)
                    }}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          {editingEnvVar === envVar.id && (
            <Formik
              initialValues={{key: envVar.key, value: envVar.value}}
              validationSchema={EnvVariableSchema}
              onSubmit={(values) => {
                setSuccessId(null)

                mutate(
                  `/api/dashboard/bots/${botId}/environment_variables`,
                  async (envVars) => {
                    const updatedEnvVar = await (
                      await fetch(
                        `/api/dashboard/bots/${botId}/environment_variables/${envVar.id}`,
                        {
                          method: 'PATCH',
                          body: JSON.stringify(values),
                        },
                      )
                    ).json()

                    const filteredEnvVars = envVars.filter(
                      (envVar) => envVar.id !== envVar.id,
                    )
                    return [...filteredEnvVars, updatedEnvVar]
                  },
                )

                setSuccessId(envVar.id)
              }}>
              {({errors, handleChange, handleSubmit, isValid}) => (
                <Form
                  className="border-top mt-3 pt-3"
                  onChange={(e) => {
                    if (successId) setSuccessId(null)
                    handleChange(e)
                  }}
                  onSubmit={handleSubmit}>
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
                  <div className="border-top pt-3">
                    {errors.name && (
                      <div className="mb-3 text-danger">{errors.name}</div>
                    )}
                    {successId && (
                      <div className="mb-3 text-success">Updated!</div>
                    )}
                    <div className="d-flex align-items-center">
                      <Button
                        onClick={() => {
                          setDeletingEnvVar(envVar.id)
                        }}
                        variant="danger">
                        Delete
                      </Button>
                      <div className="ms-auto">
                        <Button
                          className="me-3"
                          onClick={() => {
                            setEditingEnvVar(null)
                            setSuccessId(false)
                          }}
                          variant="dark">
                          Cancel
                        </Button>
                        <Button
                          disabled={!isValid}
                          variant="primary"
                          type="submit">
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <Modal
            aria-labelledby="environment-variable-deletion-modal"
            centered
            key={`modal-${index}`}
            onHide={() => {
              setDeletingEnvVar(null)
            }}
            size="lg"
            show={deletingEnvVar}>
            <Modal.Header closeButton>
              <Modal.Title id="environment-variable-deletion-modal">
                Delete Environment Variable
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                The following environment variable will be permanently deleted.
                Are you sure you want to continue?
              </p>
              <code>{envVar.key}</code>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setDeletingEnvVar(null)
                }}
                variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteEnvVar(envVar.id)
                }}
                variant="danger">
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
