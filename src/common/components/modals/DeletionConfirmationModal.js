import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function DeletionConfirmationModal({
  confirmationBody,
  confirmationTitle,
  id,
  onCancel,
  onConfirm,
  ...props
}) {
  return (
    <Modal aria-labelledby={id} centered onHide={onCancel} size="lg" {...props}>
      <Modal.Header closeButton>
        <Modal.Title id={id}>{confirmationTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{confirmationBody}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
