import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { IamModule } from './modules/iam/iam.module';
import { LoggerModule } from 'nestjs-pino';
import { ResourcesModule } from './modules/resources/resources.module';
import { ResourceTypesModule } from './modules/resource_types/resource_types.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FilesUploadModule } from './modules/files-upload/files-upload.module';
import { SavedResourcesModule } from './modules/saved-resources/saved-resources.module';
import { InitializeModule } from './modules/initialize/initialize.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    IamModule,
    UsersModule,
    ResourcesModule,
    ResourceTypesModule,
    CategoriesModule,
    FilesUploadModule,
    SavedResourcesModule,
    InitializeModule,
  ],
  controllers: [],
})
export class AppModule {}
