import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
]

const authRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"]


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authCookie = request.cookies.get('auth-storage')

  let isAuthenticated = false

  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie.value)
      isAuthenticated = !!authData.state?.isAuthenticated
    } catch (error) {
      console.error("Error parsing auth cookie:", error)
    }
  }

  // Check if the path is a reset password page with token
  const isResetPasswordWithToken = pathname === "/auth/reset-password" && request.nextUrl.searchParams.has("token")

  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname) && !isResetPasswordWithToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}