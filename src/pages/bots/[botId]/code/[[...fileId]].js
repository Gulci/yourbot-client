import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import CodeApp from '../../../../modules/bots/components/code/CodeApp'
import {getLayout} from '../../../../modules/bots/components/layouts/BotsLayout'
import useBot from '../../../../modules/bots/hooks/useBot'
import useFiles from '../../../../modules/bots/hooks/useFiles'

const CodeEditor = dynamic(
  () => import('../../../../modules/bots/components/CodeEditor'),
  {ssr: false},
)

export default function Bot() {
  const router = useRouter()
  const {botId, fileId} = router.query

  const {bot, isLoading, isBotErrored} = useBot(botId)
  const {files, isLoadingFiles, isFilesErrored} = useFiles(botId)

  let currentFile = null
  if (files) {
    if (fileId && fileId in files) currentFile = files[fileId]
    else if (files.length > 0) {
      currentFile = files[0]
    }
  }

  console.log(fileId, files)

  return bot ? (
    <>
      <section className="py-4">
        {currentFile && (
          <CodeApp>
            <CodeEditor
              className="w-100"
              mode="python"
              theme="twilight"
              value={currentFile.content}
              // setOptions={{
              //   enableBasicAutocompletion: true,
              //   enableLiveAutocompletion: true,
              //   enableSnippets: true,
              // }}
            />
          </CodeApp>
        )}
      </section>
    </>
  ) : null
}

Bot.auth = true
Bot.getLayout = getLayout
