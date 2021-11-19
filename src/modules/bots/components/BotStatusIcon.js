import classNames from 'classnames'
import styled from 'styled-components'

const BotStatusEnum = {
  LIVE: 'live',
  STOP: 'stop',
  ERROR: 'error',
}

const BotStatusIconElement = styled.div`
  height: 10px;
  width: 10px;
`

export default function BotStatusIcon({status, ...props}) {
  const iconClass = classNames(
    'rounded-circle',
    {
      'bg-success': status === BotStatusEnum.LIVE,
      'bg-danger': status === BotStatusEnum.ERROR,
      'bg-secondary': status === BotStatusEnum.STOP,
    },
    props.className,
  )

  return <BotStatusIconElement className={iconClass} />
}
