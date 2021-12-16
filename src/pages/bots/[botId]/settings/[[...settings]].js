import DiscordSettings from '../../../../modules/bots/components/settings/DiscordSettings'
import DisplayTitle from '../../../../common/components/DisplayTitle'
import EnvVariableSettings from '../../../../modules/bots/components/settings/EnvVariablesSettings'
import GeneralSettings from '../../../../modules/bots/components/settings/GeneralSettings'
import {SETTINGS_PAGES} from '../../../../modules/bots/constants'
import SettingsApp from '../../../../modules/bots/components/settings/SettingsApp'
import {getLayout} from '../../../../modules/bots/components/layouts/BotsLayout'
import useBot from '../../../../modules/bots/hooks/useBot'
import {useRouter} from 'next/router'

export default function Settings() {
  const router = useRouter()
  const {botId, settings} = router.query

  const {bot, isLoading, isError} = useBot(botId)

  let SettingsComponent = null
  switch (settings && settings[0]) {
    case SETTINGS_PAGES.DISCORD: {
      SettingsComponent = DiscordSettings
      break
    }
    case SETTINGS_PAGES.ENV_VARIABLES: {
      SettingsComponent = EnvVariableSettings
      break
    }
    // handles both general and index page routes
    default: {
      SettingsComponent = GeneralSettings
      break
    }
  }

  return bot ? (
    <>
      <DisplayTitle title="Bot Settings" />
      <section className="py-4">
        <SettingsApp>
          <SettingsComponent />
        </SettingsApp>
      </section>
    </>
  ) : null
}

export async function getServerSideProps(context) {
  if (
    context.params.settings?.length > 1 ||
    (context.params.settings &&
      Object.values(SETTINGS_PAGES).indexOf(context.params.settings[0]) < 0)
  )
    return {notFound: true}

  return {props: {}}
}

Settings.auth = true
Settings.getLayout = getLayout
