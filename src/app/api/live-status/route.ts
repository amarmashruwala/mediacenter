import { NextResponse } from 'next/server'; import { getLiveStatus } from '@/lib/owncast'
export const dynamic='force-dynamic'
export async function GET(){try{return NextResponse.json(await getLiveStatus(),{headers:{'Cache-Control':'no-store'}})}catch{return NextResponse.json({error:'Live status unavailable'},{status:502,headers:{'Cache-Control':'no-store'}})}}
