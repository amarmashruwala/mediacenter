const defaultAzuraCastBase = 'https://radio.amarmash.com'
const defaultOwncastBase = 'https://stream.amarmash.com'
const configuredAzuraCastBase = process.env.NEXT_PUBLIC_AZURACAST_BASE
const configuredOwncastBase = process.env.NEXT_PUBLIC_OWNCAST_BASE
const azuracastBase = configuredAzuraCastBase?.includes('radio.amarmash.com') ? configuredAzuraCastBase : defaultAzuraCastBase
const owncastBase = configuredOwncastBase?.includes('stream.amarmash.com') ? configuredOwncastBase : defaultOwncastBase

export const config = {
  azuracastBase,
  owncastBase,
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL ?? '',
  forumEnabled: process.env.NEXT_PUBLIC_FORUM_ENABLED === 'true',
  radioStream: `${azuracastBase}/listen/amarmash_radio/radio.aac`,
  nowPlaying: `${azuracastBase}/api/nowplaying/amarmash_radio`,
  schedule: `${azuracastBase}/api/station/amarmash_radio/schedule`,
}
