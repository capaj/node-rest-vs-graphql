import { db } from './db'
import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import swagger from 'fastify-swagger'
import { buildJsonSchemas, withRefResolver } from 'fastify-zod'

import { z } from 'zod'
import { _BlogpostModel } from './zod-schemas'

export const apiRoutes: FastifyPluginAsync = fp(async (app, _options) => {
  const idParam = z.object({
    id: z.number().int()
  })

  const deletedResponse = z.object({
    deleted: z.boolean()
  })

  const { schemas, $ref } = buildJsonSchemas({
    idParam,
    deletedResponse,
    BlogPostModel: _BlogpostModel,
    BlogPostModelInput: _BlogpostModel.omit({ id: true })
  })

  for (const schema of schemas) {
    app.addSchema(schema)
  }

  app.register(
    swagger,
    withRefResolver({
      routePrefix: `/openapi`,
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: `Blog API`,
          description: `API for simple blog`,
          version: `0.0.0`
        }
      }
    })
  )

  app.get('/blogposts', async () => {
    return db.blogpost.findMany()
  })

  app.get<{ Params: { id: number } }>(
    '/blogposts/:id',
    {
      schema: {
        params: $ref(`idParam`)
      }
    },
    async (req) => {
      return db.blogpost.findUnique({
        where: {
          id: Number(req.params.id)
        }
      })
    }
  )

  const inType = _BlogpostModel.omit({ id: true })

  app.post<{ Body: z.infer<typeof inType> }>(
    '/blogposts',
    {
      schema: {
        operationId: 'createBlogpost',
        body: $ref(`BlogPostModelInput`),
        response: {
          201: $ref(`BlogPostModel`)
        }
      }
    },
    async (req, reply) => {
      const created = await db.blogpost.create({
        data: {
          ...req.body
        }
      })
      reply.code(201)
      return created
    }
  )

  app.patch<{ Body: z.infer<typeof inType>; Params: { id: number } }>(
    '/blogposts/:id',
    {
      schema: {
        operationId: 'updateBlogpost',
        params: $ref(`idParam`),

        body: $ref(`BlogPostModelInput`),
        response: {
          200: $ref(`BlogPostModel`)
        }
      }
    },
    async (req, reply) => {
      const updated = await db.blogpost.update({
        where: { id: req.params.id },
        data: {
          ...req.body
        }
      })
      reply.code(200)
      return updated
    }
  )

  app.delete<{ Params: { id: number } }>(
    '/blogposts/:id',
    {
      schema: {
        params: $ref(`idParam`),
        response: {
          200: $ref(`deletedResponse`)
        }
      }
    },
    async (req, reply) => {
      const res = await db.blogpost.delete({
        where: { id: req.params.id }
      })
      reply.code(200)
      return {
        deleted: !!res
      }
    }
  )
})
