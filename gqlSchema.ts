import 'reflect-metadata'
import { buildSchemaSync, Field, InputType, Mutation } from 'type-graphql'

import { Arg, GraphQLISODateTime, Query, Resolver } from 'type-graphql'
import { BlogpostGQL } from './models/generated/Blogpost'
import { db } from './db'
import { BlogpostInput, BlogpostMutation } from './models/BlogpostModel'
import { GraphQLInt } from 'graphql'

@Resolver()
export class RootResolver {
  @Mutation(() => [BlogpostMutation])
  @Query(() => [BlogpostGQL])
  async blogposts(
    @Arg('from', () => GraphQLISODateTime, { nullable: true })
    from: Date,
    @Arg('to', () => GraphQLISODateTime, { nullable: true })
    to: Date
  ) {
    return db.blogpost.findMany({
      where: {
        publishedAt: { gte: from, lte: to }
      }
    })
  }

  @Mutation(() => BlogpostMutation)
  @Query(() => BlogpostGQL, { nullable: true })
  async blogpost(
    @Arg('id', () => GraphQLInt, { nullable: false })
    id: number
  ) {
    return db.blogpost.findUnique({
      where: {
        id
      }
    })
  }

  @Mutation(() => BlogpostGQL)
  async createBlogpost(@Arg('input') input: BlogpostInput) {
    const blogpost = await db.blogpost.create({
      data: {
        ...input,
        publishedAt: new Date()
      }
    })
    return blogpost
  }
}

export const gqlSchema = buildSchemaSync({
  resolvers: [RootResolver]
})
