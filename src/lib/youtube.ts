import { XMLParser } from 'fast-xml-parser'
import type { Video } from './media-types'
const configuredChannel = process.env.YOUTUBE_CHANNEL_ID ?? ''
const channel = /^UC[A-Za-z0-9_-]{20,}$/.test(configuredChannel) ? configuredChannel : 'UClikcoIG3vxfTdmgKnoUgEw'
export async function getVideos(): Promise<Video[]> {
  const headers = { Accept: 'application/atom+xml, application/xml, text/xml', 'User-Agent': 'Mozilla/5.0 (compatible; MediaCenter/1.0)' }
  let response: Response | null = null
  for (const host of ['www.youtube.com', 'youtube.com']) {
    try { const candidate = await fetch(`https://${host}/feeds/videos.xml?channel_id=${encodeURIComponent(channel)}`, { headers, next: { revalidate: 900 } }); if (candidate.ok) { response = candidate; break } } catch {}
  }
  if (!response) throw new Error('Videos unavailable')
  const xml = await response.text(); const feed = new XMLParser({ ignoreAttributes: false }).parse(xml).feed
  const entries = Array.isArray(feed?.entry) ? feed.entry : feed?.entry ? [feed.entry] : []
  return entries.map((entry: any) => { const id = String(entry['yt:videoId'] ?? entry.id?.split(':').pop() ?? ''); const thumb = entry['media:group']?.['media:thumbnail']?.['@_url'] ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; return { id, title: entry.title ?? 'Untitled video', description: entry['media:group']?.['media:description'] ?? '', published: entry.published ?? '', thumbnail: thumb, url: `https://www.youtube.com/watch?v=${id}` } }).filter((v: Video) => v.id)
}
