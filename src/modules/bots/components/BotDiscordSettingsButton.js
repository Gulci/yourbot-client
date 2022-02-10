import Button from 'react-bootstrap/Button'
import {getBotDiscordSettingsUrl} from '../utils/discordUrls'

export default function BotInviteButton({clientId}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={getBotDiscordSettingsUrl(clientId)}>
      <Button variant="discord">Discord Developer Portal</Button>
    </a>
  )
}
