import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: nextUrl }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.nextUrl.pathname.startsWith('/dashboard')
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Redirect authenticated users to dashboard if they access login page
                // formatting: check if we are on login page, logic usually handled in middleware middleware function body or here.
                // The middleware function in user code handled the redirects manually.
                // We can keep the manual handling in middleware for now to match logic exactly or move it here.
                // For now, let's just keep the basic config structure and let middleware handle the logic if preferred, 
                // OR we can move the logic here which is the "NextAuth v5 way".

                // However, the user's specific logic was:
                // if on dashboard & !loggedin -> redirect login
                // if on login & loggedin -> redirect dashboard

                // authorized callback automatically redirects to login if returning false.
                // It doesn't automatically redirect AWAY from login if true.
                return true
            }
            return true
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
