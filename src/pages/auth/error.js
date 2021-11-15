import Button from 'react-bootstrap/Button'
import {useRouter} from 'next/router'

export default function Error() {
  const {query} = useRouter()

  const errors = {
    default: {
      heading: 'Error Authenticating',
      message: <p>Please try signing in again.</p>,
    },
  }

  const {heading, message} =
    errors[query.error?.toLowerCase()] ?? errors.default

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 mw-auto min-vh-100 text-center">
      <h1>{heading}</h1>
      {message}
      <Button className="mt-4" href="/" size="lg" variant="primary">
        Go back home
      </Button>
    </div>
  )
}
