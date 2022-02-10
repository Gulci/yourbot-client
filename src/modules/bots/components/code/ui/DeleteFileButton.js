import {useRouter} from 'next/router'
import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import {mutate} from 'swr'
import DeletionConfirmationModal from '../../../../../common/components/modals/DeletionConfirmationModal'

export default function DeleteFileButton({file}) {
  const router = useRouter()
  const {botId} = router.query

  const [isDeletionConfirmationModalOpen, setIsDeletionConfirmationModalOpen] =
    useState(false)

  function deleteFile() {
    mutate(`/api/dashboard/bots/${botId}/files`, async (files) => {
      await fetch(`/api/dashboard/bots/${botId}/files/${file.id}`, {
        method: 'DELETE',
      })

      const filteredFiles = files.filter(
        (fileToFilter) => fileToFilter.id !== file.id,
      )
      return filteredFiles
    })

    setIsDeletionConfirmationModalOpen(false)
  }

  return (
    file && (
      <>
        <Button
          variant="danger"
          onClick={() => setIsDeletionConfirmationModalOpen(true)}>
          Delete File
        </Button>
        <DeletionConfirmationModal
          confirmationBody={
            <>
              <p>
                The following file will be permanently deleted. Are you sure you
                want to continue?
              </p>
              <strong>{file.name}</strong>
            </>
          }
          confirmationTitle="Delete File"
          id="file-deletion-confirmation-modal"
          onCancel={() => setIsDeletionConfirmationModalOpen(false)}
          onConfirm={deleteFile}
          show={isDeletionConfirmationModalOpen}
        />
      </>
    )
  )
}
