import Button from 'react-bootstrap/Button'
import {getBotDiscordInviteUrl} from '../utils/discordUrls'

export default function BotInviteButton({clientId}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={getBotDiscordInviteUrl(clientId)}>
      <Button variant="discord">Invite to your server</Button>
    </a>
  )
}
