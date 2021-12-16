import {jsonFetcher} from '../../../common/utils/fetchers'
import useBot from './useBot'
import useSWR from 'swr'

export default function useEnvVariables(botId) {
  const {bot, isBotLoading, isBotError} = useBot(botId)
  const {data, error} = useSWR(
    botId ? `/api/dashboard/bots/${botId}/environment_variables` : null,
    jsonFetcher,
  )

  return {
    envVariables: bot && data,
    isLoading: isBotLoading || (!error && !data),
    isError: isBotError || error,
  }
}
