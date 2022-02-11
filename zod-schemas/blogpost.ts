import { z } from 'zod'

export const _BlogpostModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().nullish(),
  title: z.string(),
  body: z.string(),
  author: z.string().nullish()
})
