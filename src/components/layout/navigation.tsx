'use client'
import Link from 'next/link'; import { usePathname } from 'next/navigation'
const links=[['/','Watch'],['/radio','Radio'],['/videos','Videos'],['/docs','Docs']]
export function Navigation({variant='top'}:{variant?:'top'|'sidebar'|'bottom'}){const path=usePathname();return <nav aria-label="Primary navigation" className={`primary-nav primary-nav--${variant}`}>{links.map(([href,label])=><Link key={href} href={href} className={`focus-ring nav-link ${path===href?'active':''}`}>{variant==='sidebar'&&<span className="nav-glyph" aria-hidden="true">{href==='/'?'◉':href==='/radio'?'◌':href==='/videos'?'▣':'⌁'}</span>}<span>{label}</span></Link>)}</nav>}
