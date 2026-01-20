import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isOnLogin = req.nextUrl.pathname.startsWith("/login")

    if (isOnDashboard) {
        if (isLoggedIn) return NextResponse.next()
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    if (isOnLogin) {
        if (isLoggedIn) return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
        return NextResponse.next()
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
