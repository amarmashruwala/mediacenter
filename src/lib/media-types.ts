export type Track = { artist: string; title: string; album?: string; art?: string; text?: string }
export type NowPlaying = { station?: { name: string; shortcode: string }; listeners?: { current: number }; now_playing?: { song?: Track; played_at?: number; duration?: number; elapsed?: number; remaining?: number }; song_history?: Array<{ sh_id: number; played_at: number; song: Track }>; live?: { is_live: boolean; streamer_name?: string }; is_online?: boolean }
export type ScheduleEntry = { id: number; type: string; name: string; title: string; description?: string; start_timestamp: number; end_timestamp: number; start: string; end: string; is_now: boolean }
export type LiveStatus = { online: boolean; streamTitle?: string; serverTime?: string; lastConnectTime?: string | null }
export type Video = { id: string; title: string; description: string; published: string; thumbnail: string; url: string }
