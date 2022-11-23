import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { OrderDto, PaginateDto } from 'src/utils';

class FilterStudentDto {
  @IsString()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  fullname: string;
}

export class GetListStudentDto {
  @IsObject()
  @ValidateNested()
  @Type(() => FilterStudentDto)
  filter: FilterStudentDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OrderDto)
  order: OrderDto;

  @IsObject()
  @ValidateNested()
  @Type(() => PaginateDto)
  paginate: PaginateDto;
}
