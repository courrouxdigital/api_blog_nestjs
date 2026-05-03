import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {
    length: 150,
    unique: true
  })
  name!: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts!: Post[]
}
