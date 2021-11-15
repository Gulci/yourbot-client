import DiscordProvider from 'next-auth/providers/discord'
import NextAuth from 'next-auth'

export default NextAuth({
  callbacks: {
    async jwt({token, profile}) {
      if (profile?.id) {
        // see if we need to create a user in the backend
        const getResponse = await fetch(
          `${process.env.YOURBOT_API_BASE_URL}/users/${profile.id}`,
          {
            headers: {
              accept: 'application/json',
              Authorization: process.env.YOURBOT_API_TOKEN,
            },
          },
        )

        if (!getResponse.ok) {
          switch (getResponse.status) {
            case 404: {
              // create a new user on the API server
              const creationResponse = await fetch(
                `${process.env.YOURBOT_API_BASE_URL}/users/`,
                {
                  body: JSON.stringify({
                    discord_oauth: {
                      avatar: profile.avatar,
                      discord_user_id: profile.id,
                      discriminator: profile.discriminator,
                      email: profile.email,
                      username: profile.username,
                    },
                  }),
                  headers: {
                    accept: 'application/json',
                    Authorization: process.env.YOURBOT_API_TOKEN,
                    'content-type': 'application/json',
                  },
                  method: 'POST',
                },
              )

              if (!creationResponse.ok) {
                const creationResponseText = await creationResponse.text()
                throw new Error(
                  `Error from API server when creating new user: ${creationResponse.status} ${creationResponse.statusText}: ${creationResponseText}`,
                )
              }
              break
            }
            default: {
              throw new Error(
                `Error from API server: ${getResponse.status} ${getResponse.statusText}`,
              )
            }
          }
        }
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
})
