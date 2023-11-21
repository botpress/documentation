export type ConfigKey =
  | 'NEXT_PUBLIC_UNLEASH_URL'
  | 'NEXT_PUBLIC_UNLEASH_CLIENT_KEY'
  | 'NEXT_PUBLIC_UNLEASH_APP_NAME'
  | 'UNLEASH_ENABLED'

const values: Partial<Record<ConfigKey, string>> = {}

export const set = (key: ConfigKey, value: string): string => {
  console.log(`Config ${key}="${value}"`)
  values[key] = value
  return value
}

export const get = (key: ConfigKey): string => {
  let value = values[key]
  if (value) {
    return value
  }

  value = process.env[key]
  if (!value) {
    throw new Error(`Missing env variable "${key}"`)
  }

  return set(key, value)
}

export const find = (key: ConfigKey): string | undefined => {
  let value = values[key]
  if (value) {
    return value
  }

  value = process.env[key]
  if (!value) {
    return
  }

  return set(key, value)
}
