import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import {mutate} from 'swr'

export default function SaveFileButton({
  className,
  newContent,
  file,
  ...buttonProps
}) {
  const router = useRouter()
  const {botId} = router.query

  const [saveSucceeded, setSaveSucceeded] = useState(false)

  function saveFile() {
    setSaveSucceeded(false)

    mutate(`/api/dashboard/bots/${botId}/files`, async (files) => {
      const updatedFile = await (
        await fetch(`/api/dashboard/bots/${botId}/files/${file.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            content: newContent,
            name: file.name,
          }),
        })
      ).json()

      const filteredFiles = files.filter((file) => updatedFile.id !== file.id)
      const newFiles = [updatedFile, ...filteredFiles].sort(
        (a, b) => a.id - b.id,
      )
      return newFiles
    })

    setSaveSucceeded(true)
  }

  // Reset success message when file changes
  useEffect(() => {
    if (file && file.content !== newContent) setSaveSucceeded(false)
  }, [file, newContent])

  return file && file.content !== newContent ? (
    <>
      <Button
        className={className}
        variant="success"
        onClick={() => saveFile()}
        {...buttonProps}>
        Save File
      </Button>
    </>
  ) : saveSucceeded ? (
    <span className={`${className && className + ' '}text-success`}>
      Saved file.
    </span>
  ) : null
}
