import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import DisplayTitle from '../../../../common/components/DisplayTitle'
import CodeApp from '../../../../modules/bots/components/code/CodeApp'
import DeleteFileButton from '../../../../modules/bots/components/code/ui/DeleteFileButton'
import {getLayout} from '../../../../modules/bots/components/layouts/BotsLayout'
import useBot from '../../../../modules/bots/hooks/useBot'
import useFiles from '../../../../modules/bots/hooks/useFiles'

const CodeEditor = dynamic(
  () => import('../../../../modules/bots/components/code/CodeEditor'),
  {ssr: false},
)

export default function Bot() {
  const router = useRouter()
  const {botId, fileId} = router.query

  const {bot, isLoading, isBotErrored} = useBot(botId)
  const {files, isLoadingFiles, isFilesErrored} = useFiles(botId)
  const keyedFiles =
    (files && Object.assign({}, ...files.map((file) => ({[file.id]: file})))) ||
    {}

  let currentFile = null
  if (files) {
    if (fileId && fileId[0] in keyedFiles) currentFile = keyedFiles[fileId[0]]
    else if (files.length > 0) {
      currentFile = files[0]
    }
  }

  return bot ? (
    <>
      <DisplayTitle>
        {currentFile ? (
          <>
            <h1>{currentFile && currentFile.name}</h1>
            <div className="ms-auto">
              <DeleteFileButton file={currentFile} />
            </div>
          </>
        ) : (
          !isLoading && <h1>No files :(</h1>
        )}
      </DisplayTitle>
      <section className="py-4">
        <CodeApp>
          <CodeEditor
            className="w-100"
            mode="python"
            readOnly={!currentFile}
            theme="twilight"
            value={
              currentFile
                ? currentFile.content
                : 'Create a file to start editing.'
            }
            // setOptions={{
            //   enableBasicAutocompletion: true,
            //   enableLiveAutocompletion: true,
            //   enableSnippets: true,
            // }}
          />
        </CodeApp>
      </section>
    </>
  ) : null
}

Bot.auth = true
Bot.getLayout = getLayout
