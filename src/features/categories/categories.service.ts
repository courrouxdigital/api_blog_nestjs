import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    const data = await this.categoryRepository.save(category);
    return {
      message: 'Categoria creada con exito',
      data
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
      order: { name: 'ASC' }
    });
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new BadRequestException('Categoria no encontrada');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    const data = await this.categoryRepository.save(category);
    return {
      message: 'Categoria actualizada con exito',
      data
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return {
      message: 'Categoria eliminada con exito'
    }
  }
}
