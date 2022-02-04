import { db } from '../db'
import { InputType, Field, Arg, ObjectType } from 'type-graphql'
import { BlogpostGQL } from './generated/Blogpost'

@InputType()
export class BlogpostInput {
  @Field()
  title: string
  @Field()
  body: string
  @Field()
  author: string
}

@ObjectType()
export class BlogpostMutation extends BlogpostGQL {
  @Field(() => BlogpostGQL)
  update(@Arg('patch') patch: BlogpostInput) {
    return db.blogpost.update({
      where: {
        id: this.id
      },
      data: patch
    })
  }

  @Field(() => BlogpostGQL)
  delete() {
    return db.blogpost.delete({
      where: { id: this.id }
    })
  }
}
