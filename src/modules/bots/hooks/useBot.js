import {jsonFetcher} from '../../../common/utils/fetchers'
import useSWR from 'swr'

export default function useBot(botId) {
  const {data, error} = useSWR(
    botId ? `/api/dashboard/bots/${botId}` : null,
    jsonFetcher,
  )

  return {
    bot: data,
    isLoading: !error && !data,
    isError: error,
  }
}
