import NextAuth from "next-auth"
import FusionAuthProvider from "next-auth/providers/fusionauth";

export default NextAuth({
    debug: true,
    providers: [
        FusionAuthProvider({
            id: "fusionauth",
            name: "FusionAuth",
            issuer:  process.env.FUSION_AUTH_URL,
            clientId:  process.env.FUSION_AUTH_CLIENT_ID,
            clientSecret:  process.env.FUSION_AUTH_CLIENT_SECRET,
        }),
    ]
})