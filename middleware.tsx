import type {NextRequest} from "next/server"
import type {JWT} from "next-auth/jwt"

import {withAuth} from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({req, token}) {
            console.log(token);
            return !!token;
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
})

export const config = {matcher: ["/", "/editor/:id*"]}