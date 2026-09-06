import { XMLParser } from 'fast-xml-parser'
import type { Video } from './media-types'
const configuredChannel = process.env.YOUTUBE_CHANNEL_ID ?? ''
const channel = /^UC[A-Za-z0-9_-]{20,}$/.test(configuredChannel) ? configuredChannel : 'UClikcoIG3vxfTdmgKnoUgEw'
const apiKey = process.env.YOUTUBE_API_KEY
async function getAllUploadVideos(): Promise<Video[]> {
  if (!apiKey) return []
  const playlistId = `UU${channel.slice(2)}`
  const videos: Video[] = []
  let pageToken = ''
  do {
    const query = new URLSearchParams({ part: 'snippet,contentDetails', playlistId, maxResults: '50', key: apiKey })
    if (pageToken) query.set('pageToken', pageToken)
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${query}`, { headers: { Accept: 'application/json' }, next: { revalidate: 900 } })
    if (!response.ok) throw new Error('YouTube API unavailable')
    const data = await response.json() as { items?: Array<{ contentDetails?: { videoId?: string }; snippet?: { title?: string; description?: string; publishedAt?: string; thumbnails?: Record<string, { url?: string }> } }>; nextPageToken?: string }
    for (const item of data.items ?? []) {
      const id = item.contentDetails?.videoId
      if (!id) continue
      const thumbnails = item.snippet?.thumbnails ?? {}
      const thumbnail = thumbnails.maxres?.url ?? thumbnails.high?.url ?? thumbnails.medium?.url ?? thumbnails.default?.url ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      videos.push({ id, title: item.snippet?.title ?? 'Untitled video', description: item.snippet?.description ?? '', published: item.snippet?.publishedAt ?? '', thumbnail, url: `https://www.youtube.com/watch?v=${id}` })
    }
    pageToken = data.nextPageToken ?? ''
  } while (pageToken)
  return videos
}
async function getRecentFeedVideos(): Promise<Video[]> {
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
export async function getVideos(): Promise<Video[]> {
  if (apiKey) {
    try { return await getAllUploadVideos() } catch { /* Fall back to the public feed if the key or quota is unavailable. */ }
  }
  return getRecentFeedVideos()
}
