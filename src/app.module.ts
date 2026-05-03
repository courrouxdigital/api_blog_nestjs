import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabasesModule } from './databases/databases.module';
import { FeaturesModule } from './features/features.module';

import { envValidation } from './config/env-validation.config';
import { CommonModule } from './common/common.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: envValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      load: [databaseConfig]
    }),
    DatabasesModule,
    CommonModule,
    FeaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
