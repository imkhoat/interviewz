import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale } from "@shared/i18n/config";

const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
]

const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password"
]

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authCookie = request.cookies.get('auth-storage')
  const localeCookie = request.cookies.get('NEXT_LOCALE')

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

  // Set default locale if not exists
  if (!localeCookie) {
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', defaultLocale)
    return response
  }

  // Handle authentication
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname) && !isResetPasswordWithToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}