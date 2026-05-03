import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset?: number = 1;

  @IsOptional()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}