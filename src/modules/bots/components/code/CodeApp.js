import dynamic from 'next/dynamic'
import {useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CodeFileNav from './navs/CodeFileNav'
import SaveFileButton from './ui/SaveFileButton'

const CodeEditor = dynamic(
  () => import('../../../../modules/bots/components/code/CodeEditor'),
  {ssr: false},
)

export default function CodeApp({file, loading}) {
  const [editorValue, setEditorValue] = useState('')

  // Update editor value on file change
  useEffect(() => {
    if (!loading && file) {
      setEditorValue(file.content)
    }
  }, [file, loading])

  return (
    <Container>
      <Row>
        <Col lg="2">
          <CodeFileNav />
        </Col>
        <Col lg="10">
          <CodeEditor
            className="w-100"
            mode="python"
            onChange={setEditorValue}
            readOnly={!file}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            theme="twilight"
            value={editorValue}
          />
          <div className="d-flex align-items-center mt-3">
            <SaveFileButton
              className="ms-auto"
              newContent={editorValue}
              file={file}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
