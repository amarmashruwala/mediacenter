import { config } from './config'
export async function getLiveStatus() { const r = await fetch(`${config.owncastBase}/api/status`, { cache: 'no-store' }); if (!r.ok) throw new Error('Owncast unavailable'); const data = await r.json(); return { online: Boolean(data.online), streamTitle: data.streamTitle, serverTime: data.serverTime, lastConnectTime: data.lastConnectTime } }
