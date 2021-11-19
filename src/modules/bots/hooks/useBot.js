import {jsonFetcher} from '../../../common/utils/fetchers'
import useSWR from 'swr'

export default function useBot(botId) {
  const {data, error} = useSWR(`/api/dashboard/bots/${botId}`, jsonFetcher)

  return {
    bot: data,
    isLoading: !error && !data,
    isError: error,
  }
}
