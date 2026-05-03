import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../categories/entities/category.entity";
import { Tag } from "../../tags/entities/tag.entity";

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('varchar', {
    unique: true
  })
  slug!: string;

  @Column('text')
  content!: string;

  @Column('varchar', {
    nullable: true
  })
  excerpt?: string | null;

  @Column('boolean', {
    default: false
  })
  isPublished!: boolean;

  @Column('uuid', {
    nullable: true
  })
  categoryId!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id'
    }
  })
  tags!: Tag[];
}
