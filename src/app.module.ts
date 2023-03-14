import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { UserModule } from "./user/user.module";
import { ConfigModule } from '@nestjs/config';


@Module({
 
  imports: [
    TypeOrmModule.forRoot({
      
        type: "mysql",
          host: "172.17.0.2",
          port: 3306,
          username: "develop",
          password: "mypassword",
          database: "nest_api",
          entities: ["dist/**/*.entity{.ts,.js}"],
          synchronize: true
    
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), 
  ConfigModule.forRoot({
    isGlobal: true
  }),
  UserModule,
],
  controllers: [],
  providers: [],
})
export class AppModule { }