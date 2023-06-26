import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Need to redirect because if we don't have /api-documentation/api-documentation.mdx it doesn't show up in the header
  return NextResponse.redirect(new URL('/api-documentation', request.url))
}
export const config = {
  matcher: '/api-documentation/api-documentation',
}
