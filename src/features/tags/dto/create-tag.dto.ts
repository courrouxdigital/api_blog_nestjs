import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty({ message: 'El nombre del tag es obligatorio' })
  @IsString({ message: 'El nombre del tag es un tipo de dato invalido' })
  name!: string;
}
