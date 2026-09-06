import type { Metadata } from 'next'
import './globals.css'
import { MediaProvider } from '@/components/media/media-provider'
import { AppHeader } from '@/components/layout/app-header'
import { GlobalRadioMiniPlayer } from '@/components/media/global-radio-mini-player'
import { ServiceWorkerRegister } from '@/components/layout/service-worker-register'
export const metadata: Metadata = { title: 'MediaCenter · Unified-Live', description: 'Live radio, video and community for Unified-Live', icons: { icon: '/icons/icon.svg' } }
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><MediaProvider><ServiceWorkerRegister /><AppHeader /><main id="main-content">{children}</main><GlobalRadioMiniPlayer /></MediaProvider></body></html> }
