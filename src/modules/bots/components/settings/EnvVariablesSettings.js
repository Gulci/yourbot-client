import {DEFAULT_ENVIRONMENT_VARIABLES} from '../../constants'
import EnvVariableForm from './ui/EnvVariableForm'
import EnvVariablesList from './ui/EnvVariablesList'
import useEnvVariables from '../../hooks/useEnvVariables'
import {useRouter} from 'next/router'

export default function EnvVariablesSettings() {
  const router = useRouter()
  const {botId} = router.query

  const {envVariables, isEnvVariablesLoading, isEnvVariablesError} =
    useEnvVariables(botId)

  const nonDefaultEnvVariables =
    envVariables &&
    envVariables.filter((envVar) => {
      return DEFAULT_ENVIRONMENT_VARIABLES.indexOf(envVar.key) < 0
    })

  return envVariables ? (
    <>
      <h2>Environment Variables</h2>
      <p>
        Environment variables are a way to store secrets in your code safely.
      </p>
      <p>
        Example usage: <code>os.environ["YOUR_ENVIRONMENT_VARIABLE_KEY"]</code>
      </p>
      <EnvVariableForm />
      {nonDefaultEnvVariables.length > 0 && (
        <>
          <div className="border-top my-4"></div>
          <EnvVariablesList envVars={nonDefaultEnvVariables} />
        </>
      )}
    </>
  ) : null
}
