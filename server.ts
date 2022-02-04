import Fastify from 'fastify'
import { gqlSchema } from './gqlSchema'
import mercurius from 'mercurius'

const app = Fastify({
  logger: {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname'
    }
  }
})

app.register(mercurius, {
  schema: gqlSchema,
  graphiql: true
})

app.listen(process.env.PORT || 3000)
