import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { join } from 'path';
import { renderGraphiQL } from 'graphql-yoga';

@Module({
  imports: [
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      graphiql: process.env.APP_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), 'src/resource/schema.gql'),
      buildSchemaOptions: {
        noDuplicatedFields: true,
      },
      multipart: true,
      renderGraphiQL: (options) => {
        options.title = 'GQL';
        return renderGraphiQL(options);
      },
    }),
  ],
})
export class YogaGraphqlModule {}
