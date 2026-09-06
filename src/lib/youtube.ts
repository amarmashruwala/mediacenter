import { XMLParser } from 'fast-xml-parser'
import type { Video } from './media-types'
const channel = process.env.YOUTUBE_CHANNEL_ID ?? 'UClikcoIG3vxfTdmgKnoUgEw'
export async function getVideos(): Promise<Video[]> {
  const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel}`, { next: { revalidate: 900 } })
  if (!r.ok) throw new Error('Videos unavailable')
  const xml = await r.text(); const feed = new XMLParser({ ignoreAttributes: false }).parse(xml).feed
  const entries = Array.isArray(feed?.entry) ? feed.entry : feed?.entry ? [feed.entry] : []
  return entries.map((entry: any) => { const id = String(entry['yt:videoId'] ?? entry.id?.split(':').pop() ?? ''); const thumb = entry['media:group']?.['media:thumbnail']?.['@_url'] ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; return { id, title: entry.title ?? 'Untitled video', description: entry['media:group']?.['media:description'] ?? '', published: entry.published ?? '', thumbnail: thumb, url: `https://www.youtube.com/watch?v=${id}` } }).filter((v: Video) => v.id)
}
