import { NextRequest, NextResponse } from 'next/server'

const singInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('spacetime_session')?.value

  if (!token) {
    return NextResponse.redirect(singInUrl, {
      headers: {
        'Set-Cookie': `redirect_to=${request.url}; path=/; HttpOnly; MaxAge=60;`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
