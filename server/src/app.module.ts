import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Apartment } from './apartments/entities/apartment.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { UploadModule } from './upload/upload.module';
import { UploadController } from './upload/upload.controller';
import { multerConfig } from './multer.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApartmentImageModule } from './apartment-image/apartment-image.module';
import { ApartmentImage } from './apartment-image/entities/apartment-image.entity';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({ 
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Role, Apartment, ApartmentImage],
      logging: true, 
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      playground: true,
    }),
    UserModule,
    AuthModule,
    RolesModule,
    ApartmentsModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ApartmentImageModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})

export class AppModule {}
