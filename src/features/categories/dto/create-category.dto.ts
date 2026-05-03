import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoria es obligatorio' })
  @IsString({ message: 'El nombre de la categoria no es un tipo valido' })
  name!: string;

  @IsNotEmpty({ message: 'El slug de la categoria es obligatorio' })
  @IsString({ message: 'El slug de la categoria no es un tipo valido' })
  slug!: string;

  @IsOptional()
  @IsString({ message: 'La descripcion de la categoria no es un tipo valido' })
  description?: string;
}
