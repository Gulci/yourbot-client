import Button from 'react-bootstrap/Button'

export default function Custom404() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 mw-auto min-vh-100 text-center">
      <div className="d-flex align-items-center">
        <h1 className="mb-0 border-right pr-4">404</h1>
        <span className="pl-4">This page could not be found.</span>
      </div>
      <Button className="mt-4" href="/" size="lg" variant="primary">
        Go back home
      </Button>
    </div>
  )
}
