import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // console.log({
            //     user, account
            // });


            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id as string)

            if (!existingUser?.emailVerified) return false

            return true
        },
        async session({ token, session }) {
            // console.log({
            //     sessionToken: token
            // });

            if (token.sub && session.user) {
                session.user.id = token.sub as string
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            return session
        },
        async jwt({ token }) {
            // console.log({ token });
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)

            if (!existingUser) return token

            token.role = existingUser.role

            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    // secret: process.env.NEXT_AUTH_SECRET,
    ...authConfig
})