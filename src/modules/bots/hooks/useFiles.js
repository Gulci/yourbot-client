import {jsonFetcher} from '../../../common/utils/fetchers'
import useBot from './useBot'
import useSWR from 'swr'

export default function useFiles(botId) {
  const {bot, isBotLoading, isBotError} = useBot(botId)
  const {data, error} = useSWR(
    botId ? `/api/dashboard/bots/${botId}/files` : null,
    jsonFetcher,
  )

  return {
    files: bot && data,
    isLoading: isBotLoading || (!error && !data),
    isError: isBotError || error,
  }
}
