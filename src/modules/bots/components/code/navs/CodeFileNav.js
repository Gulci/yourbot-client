import Link from 'next/link'
import {useRouter} from 'next/router'
import Nav from 'react-bootstrap/Nav'
import useFiles from '../../../hooks/useFiles'
import AddFile from '../ui/AddFile'

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
              href={`/bots/${botId}/code/${file.id}`}
              key={file.id}
              passHref>
              <Nav.Link
                active={fileId && file.id === fileId[0]}
                className="ps-0">
                {file.name}
              </Nav.Link>
            </Link>
          ))}
        </Nav>
      )}
      <AddFile />
    </>
  )
}
