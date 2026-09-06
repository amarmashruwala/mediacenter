export const config = {
  azuracastBase: process.env.NEXT_PUBLIC_AZURACAST_BASE ?? 'https://radio.amarmash.com',
  owncastBase: process.env.NEXT_PUBLIC_OWNCAST_BASE ?? 'https://stream.amarmash.com',
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL ?? '',
  forumEnabled: process.env.NEXT_PUBLIC_FORUM_ENABLED === 'true',
  radioStream: `${process.env.NEXT_PUBLIC_AZURACAST_BASE ?? 'https://radio.amarmash.com'}/listen/amarmash_radio/radio.aac`,
  nowPlaying: `${process.env.NEXT_PUBLIC_AZURACAST_BASE ?? 'https://radio.amarmash.com'}/api/nowplaying/amarmash_radio`,
  schedule: `${process.env.NEXT_PUBLIC_AZURACAST_BASE ?? 'https://radio.amarmash.com'}/api/station/amarmash_radio/schedule`,
}
