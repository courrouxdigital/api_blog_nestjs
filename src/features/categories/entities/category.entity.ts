import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {
    length: 150
  })
  name!: string;

  @Column('varchar', {
    unique: true
  })
  slug!: string;

  @Column('varchar', {
    nullable: true
  })
  description?: string | null;

  @OneToMany(() => Post, (post) => post.category)
  posts!: Post[];
}
