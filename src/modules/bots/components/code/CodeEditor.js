import dynamic from 'next/dynamic'

const CodeEditor = dynamic(
  async () => {
    const ace = await import('react-ace')
    require('ace-builds/src-noconflict/mode-python')
    require('ace-builds/src-noconflict/theme-twilight')
    require('ace-builds/src-noconflict/ext-language_tools')
    return ace
  },
  {
    ssr: false,
  },
)

export default CodeEditor
