import {Field, Formik} from 'formik'

import {useRouter} from 'next/router'
import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import {mutate} from 'swr'
import {DEFAULT_FILE_CONTENT} from '../../../constants'
import {NewFileSchema} from '../../../schemas'

export default function AddFile() {
  const router = useRouter()
  const {botId} = router.query

  const [isAddingFile, setIsAddingFile] = useState(false)

  if (isAddingFile) {
    return (
      <Formik
        initialValues={{name: ''}}
        validateOnMount={true}
        validationSchema={NewFileSchema}
        onSubmit={async (values, actions) => {
          mutate(`/api/dashboard/bots/${botId}/files`, async (files) => {
            const newFile = await (
              await fetch(`/api/dashboard/bots/${botId}/files`, {
                method: 'POST',
                body: JSON.stringify({
                  name: values.name,
                  content: DEFAULT_FILE_CONTENT,
                }),
              })
            ).json()

            return [...files, newFile]
          })

          actions.resetForm()
          actions.validateForm()
          setIsAddingFile(false)
        }}>
        {({handleSubmit, isValid}) => (
          <Form
            className="d-flex flex-column align-items-start"
            onSubmit={handleSubmit}>
            <Form.Group>
              <InputGroup size="sm">
                <Field name="name" required>
                  {({field}) => (
                    <FormControl
                      aria-label="Name of new file"
                      placeholder="File name"
                      type="text"
                      {...field}
                    />
                  )}
                </Field>
                <Button
                  id="create-file-button"
                  disabled={!isValid}
                  size="sm"
                  type="submit"
                  variant="primary">
                  Create file
                </Button>
              </InputGroup>
            </Form.Group>
            <Button
              className="mt-2"
              onClick={() => {
                setIsAddingFile(false)
              }}
              size="sm"
              variant="secondary">
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <Button
      className="mt-1"
      onClick={() => {
        setIsAddingFile(true)
      }}
      size="sm"
      variant="primary">
      New file
    </Button>
  )
}
