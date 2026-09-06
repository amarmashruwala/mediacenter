import { config } from './config'
import type { NowPlaying, ScheduleEntry } from './media-types'
export async function getSchedule(): Promise<ScheduleEntry[]> { const r = await fetch(config.schedule, { next: { revalidate: 300 } }); if (!r.ok) throw new Error('Schedule unavailable'); return r.json() }
export function trackFrom(np?: NowPlaying | null) { return np?.now_playing?.song }
