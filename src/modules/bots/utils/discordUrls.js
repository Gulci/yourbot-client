import {DISCORD_URL_COMPONENTS} from '../constants'

export function getBotDiscordInviteUrl(clientId) {
  return `${DISCORD_URL_COMPONENTS.DISCORD_API_ENDPOINT}/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=274877941760`
}
