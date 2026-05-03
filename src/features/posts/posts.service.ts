import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { TagsService } from '../tags/tags.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService,
    private readonly tagsService: TagsService,
  ) { }

  async create(createPostDto: CreatePostDto) {
    const { categoryId, tagIds, ...rest } = createPostDto;

    // 1. Buscar la categoria.
    const category = categoryId
      ? await this.categoriesService.findOne(categoryId)
      : undefined;

    // 2. Buscar los tags.
    const tags = tagIds
      ? await this.tagsService.findByIds(tagIds)
      : [];

    // 3. Crear el post.
    const post = this.postRepository.create({
      ...rest,
      category,
      tags
    });

    const data = await this.postRepository.save(post);

    return {
      message: 'El post se creo con exito',
      data
    }
  }

  async findAll({ limit = 20, offset = 1 }: PaginationDto) {
    const skip = (offset - 1) * limit;
    const [posts, total] = await this.postRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' }
    });
    const lastPage = Math.ceil(total / limit);
    return {
      data: posts,
      meta: {
        total,
        page: offset,
        lastPage,
        limit
      }
    };
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['category', 'tags']
    });

    if (!post) {
      throw new BadRequestException('El post no existe');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { categoryId, tagIds, ...rest } = updatePostDto;
    // 1. Buscamos si existe el Post
    const post = await this.findOne(id);

    // 2. Actualizamos los datos basicos.
    Object.assign(post, rest);

    // 3. Si viene el id de la categoria la editamos.
    if (categoryId != post.categoryId) {
      post.category = categoryId ? await this.categoriesService.findOne(categoryId) : post.category;
    }

    // 4. Actualizamos los tags
    if (tagIds) {
      post.tags = await this.tagsService.findByIds(tagIds);
    }

    const data = await this.postRepository.save(post);

    return {
      message: 'El post se modifico con exito',
      data
    }
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    await this.postRepository.remove(post);
    return { message: 'El post se elimino con exito' };
  }
}
