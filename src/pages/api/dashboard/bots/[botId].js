import {getSession} from 'next-auth/react'

export default async function bot(req, res) {
  const session = await getSession({req})

  if (session) {
    if (req.query.botId) {
      const response = await fetch(
        `${process.env.YOURBOT_API_BASE_URL}/bots/${req.query.botId}/`,
        {
          headers: {
            accept: 'application/json',
            Authorization: process.env.YOURBOT_API_TOKEN,
          },
        },
      )

      if (response.ok) {
        res.status(200).json((await response.json()).data)
      } else {
        console.error(
          'Error from API server',
          response.status,
          response.statusText,
        )
        res.status(500)
      }
    } else {
      res.status(400)
    }
  } else {
    res.status(401)
  }
  res.end()
}
