import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../features/categories/entities/category.entity';
import { Post } from '../../features/posts/entities/post.entity';
import { Tag } from '../../features/tags/entities/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Post, Category, Tag],
      synchronize: true,
    }),
  ],
  providers: [SeedService]
})
export class SeedModule { }
