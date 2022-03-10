import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
// import keys from './config/keys';
// import { databaseProviders } from './data/database.provider';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    MongooseModule.forRoot(
      'mongodb://Inno:__1234__@cluster0-shard-00-00.1kzhr.mongodb.net:27017,cluster0-shard-00-01.1kzhr.mongodb.net:27017,cluster0-shard-00-02.1kzhr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-9zv0rj-shard-0&authSource=admin&retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}
