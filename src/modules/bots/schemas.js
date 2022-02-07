import {object, string} from 'yup'

export const BotSettingsSchema = object().shape({
  application_id: string().required(),
  name: string().required(),
  public_key: string().required(),
  token: string().required(),
})

export const BotNameSettingsSchema = object().shape({
  name: string().required(),
})

export const BotDiscordSettingsSchema = object().shape({
  application_id: string().required(),
  public_key: string().required(),
  token: string().required(),
})

export const EnvVariableSchema = object().shape({
  key: string().required(),
  value: string().required(),
})