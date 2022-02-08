import Link from 'next/link'
import {useRouter} from 'next/router'
import Nav from 'react-bootstrap/Nav'
import useFiles from '../../../hooks/useFiles'
import Button from 'react-bootstrap/Button'

export default function CodeFileNav() {
  const router = useRouter()
  const {botId, fileId} = router.query

  const {files, isLoadingFiles, isFilesErrored} = useFiles(botId)

  return (
    <>
      {files && (
        <Nav className="flex-column">
          {files.map((file) => (
            <Link
              href={`/bots/${botId}/code/${file.uuid}`}
              key={file.uuid}
              passHref>
              <Nav.Link
                active={fileId && file.uuid === fileId[0]}
                className="ps-0">
                {file.name}
              </Nav.Link>
            </Link>
          ))}
        </Nav>
      )}
    </>
  )
}
