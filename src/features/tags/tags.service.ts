import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) { }

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    const data = await this.tagRepository.save(tag);
    return {
      message: 'El Tag se creo con exito',
      data
    };
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag) {
      throw new BadRequestException('El tag no existe');
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    if (updateTagDto.name) tag.name = updateTagDto.name;
    const data = await this.tagRepository.save(tag);
    return {
      message: 'El Tag se modifico con exito',
      data
    };
  }

  async remove(id: string) {
    const tag = await this.findOne(id);
    await this.tagRepository.remove(tag);
    return { message: 'El Tag se elimino con exito' };
  }

  async findByIds(ids: string[]) {
    const tags = await this.tagRepository.findBy({ id: In(ids) });
    return tags;
  }
}
