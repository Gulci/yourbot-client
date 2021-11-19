import {jsonFetcher} from '../../../common/utils/fetchers'
import useSWR from 'swr'

export default function useBots() {
  const {data, error} = useSWR('/api/dashboard/bots/', jsonFetcher)

  return {
    bots: data,
    isLoading: !error && !data,
    isError: error,
  }
}
