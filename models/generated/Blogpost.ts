import { db } from 'prisma'
import { Field, ObjectType, Int, Arg } from 'type-graphql'

@ObjectType()
export class BlogpostGQLScalars {
  @Field(() => Int)
  id: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ nullable: true })
  publishedAt?: Date

  @Field()
  title: string

  @Field()
  body: string

  @Field({ nullable: true })
  author?: string
}

@ObjectType()
export class BlogpostGQL extends BlogpostGQLScalars {
  // skip overwrite 👇
}
