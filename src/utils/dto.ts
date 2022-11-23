import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  by: string;

  @IsString()
  @IsNotEmpty()
  direction: any;
}

export class PaginateDto {
  @IsInt()
  @Min(1)
  limit: number;

  @IsInt()
  @Min(1)
  page: number;
}
