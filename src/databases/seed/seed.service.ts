import { Injectable } from '@nestjs/common';
import { EntityManager, DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Category } from '../../features/categories/entities/category.entity';
import { Post } from '../../features/posts/entities/post.entity';
import { Tag } from '../../features/tags/entities/tag.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly dataSource: DataSource,
  ) { }

  async runSeed() {
    console.log('--- Iniciando Seed ---');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      // 1. Limpieza de datos.
      await queryRunner.query(
        `
          TRUNCATE TABLE "posts", "categories", "tags"
          RESTART IDENTITY CASCADE
        `
      );
      console.log('Tablas limpiadas.');

      // 2. Ejecutar seeds secuenciales
      const categories = await this.seedCategories(queryRunner.manager);
      const tags = await this.seedTags(queryRunner.manager);
      await this.seedPosts(queryRunner.manager, categories, tags);


      console.log('--- Seed Finalizado con Éxito ---');
    } catch (error) {
      console.error('Error en el seed:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }

  }

  private async seedCategories(manager: EntityManager): Promise<Category[]> {
    const categories = ['Tecnologias', 'Desarrollo de Software', 'Frameworks', 'APIs'].map(name => {
      const slug = faker.helpers.slugify(name).toLowerCase();
      return manager.create(Category, { name, slug });
    });
    return await manager.save(Category, categories);
  }

  private async seedTags(manager: EntityManager) {
    const tags = ['NestJS', 'TypeORM', 'TypeScript', 'Docker', 'NextJS'].map(name =>
      manager.create(Tag, { name })
    );
    return await manager.save(Tag, tags);
  }

  private async seedPosts(manager: EntityManager, categories: Category[], tags: Tag[]) {
    const posts: Post[] = [];
    for (let i = 0; i < 20; i++) {
      const title = faker.lorem.sentence();
      posts.push(manager.create(Post, {
        title,
        slug: faker.helpers.slugify(title).toLowerCase(),
        content: faker.lorem.paragraphs(3),
        excerpt: faker.lorem.sentence(),
        isPublished: true,
        category: faker.helpers.arrayElement(categories),
        tags: faker.helpers.arrayElements(tags, { min: 1, max: 3 }),
        createdAt: faker.date.past(),
      }));
    }
    await manager.save(Post, posts);
  }
}
