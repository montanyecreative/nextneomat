import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = 'style-guide-session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get(SESSION_COOKIE)
  const isAuthenticated = !!session?.value

  if (pathname === '/style-guide' || pathname === '/style-guide/') {
    const destination = isAuthenticated ? '/style-guide/dashboard' : '/style-guide/login'
    return NextResponse.redirect(new URL(destination, request.url))
  }

  if (pathname.startsWith('/style-guide/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/style-guide/login', request.url))
    }
  }

  if (pathname.startsWith('/style-guide/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/style-guide/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/style-guide', '/style-guide/:path*'],
}
