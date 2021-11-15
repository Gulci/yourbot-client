import Button from 'react-bootstrap/Button'

export default function Custom500() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 mw-auto min-vh-100 text-center">
      <div className="d-flex align-items-center">
        <h1 className="mb-0 border-right pe-4">500</h1>
        <span className="ps-4">Something broke...</span>
      </div>
      <Button className="mt-4" href="/" size="lg" variant="primary">
        Go back home
      </Button>
    </div>
  )
}
