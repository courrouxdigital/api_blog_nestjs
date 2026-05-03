import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  excerpt?: string | null;

  @IsBoolean()
  isPublished!: boolean;

  @IsOptional()
  @IsUUID()
  categoryId!: string | null;

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  tagIds?: string[];
}
