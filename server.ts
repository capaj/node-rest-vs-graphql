import { apiRoutes } from './apiRoutes'
import Fastify from 'fastify'

const app = Fastify({
  logger: {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname'
    }
  }
})
app.register(apiRoutes, { prefix: '/api/v1' })

app.listen(process.env.PORT || 3000)
