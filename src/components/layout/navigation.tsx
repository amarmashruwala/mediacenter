'use client'
import Link from 'next/link'; import { usePathname } from 'next/navigation'
const links=[['/','Watch'],['/radio','Radio'],['/videos','Videos'],['/docs','Docs']]
export function Navigation(){const path=usePathname();return <nav aria-label="Primary navigation" style={{display:'flex',gap:4,alignItems:'center',flexWrap:'wrap',justifyContent:'flex-end'}}>{links.map(([href,label])=><Link key={href} href={href} className="focus-ring" style={{padding:'.55rem .72rem',borderRadius:10,fontSize:'.9rem',color:path===href?'var(--accent)':'var(--muted)',background:path===href?'rgba(101,230,178,.08)':'transparent'}}>{label}</Link>)}</nav>}
