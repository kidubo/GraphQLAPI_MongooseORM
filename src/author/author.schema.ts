import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from '../book/book.schema';

export type AuthorDocument = Author & mongoose.Document;

@ObjectType()
@Schema()
export class Author {
  @Field(() => ID) // <-- GraphQL type
  _id: string; // <-- TypeScript type

  @Field()
  @Prop()
  name: string;

  @Field(() => [Book])
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' } })
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;
}
