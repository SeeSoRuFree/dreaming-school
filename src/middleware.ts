import { NextRequest, NextResponse } from 'next/server'

export function middleware(_request: NextRequest) {
  // Since we're using localStorage for auth, we can't check auth status in middleware
  // Instead, we'll handle access control in the components themselves
  // This middleware is mainly for future server-side auth implementation
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}