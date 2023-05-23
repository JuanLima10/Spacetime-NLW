import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirect_to')?.value

  const registerResponse = await api.post('/register', {
    code,
  })
  const { token } = await registerResponse.data

  const redirectUrl = redirectTo ?? new URL('/', request.url)

  const cookieExpires = 60 * 60 * 24 * 7

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `spacetime_session=${token}; Path=/; maxAge=${cookieExpires};`,
    },
  })
}
