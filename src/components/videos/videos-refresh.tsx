'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const REFRESH_INTERVAL = 15 * 60 * 1000

export function VideosRefresh() {
  const router = useRouter()
  useEffect(() => {
    const timer = window.setInterval(() => router.refresh(), REFRESH_INTERVAL)
    return () => window.clearInterval(timer)
  }, [router])
  return <button type="button" onClick={() => router.refresh()} className="focus-ring" style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '9px 13px', background: 'var(--panel)', color: 'var(--text)', fontSize: '.85rem' }}>Refresh feed</button>
}
