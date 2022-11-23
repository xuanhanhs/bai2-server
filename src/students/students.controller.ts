import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/auth/guards/basic.guard';
import { PaginateResult } from 'src/utils';
import { CreateStudentDto } from './dtos/create-student.dto';
import { GetListStudentDto } from './dtos/get-list-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { StudentEntity } from './entities/student.entity';
import { StudentsService } from './students.service';

@ApiBasicAuth('basic-auth')
@ApiTags('students')
@Controller('students')
@UseGuards(BasicAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create-student')
  async createStudent(@Body() body: CreateStudentDto): Promise<StudentEntity> {
    return await this.studentsService.createStudent(body);
  }

  @Post('get-list-student')
  async getListStudent(
    @Body() body: GetListStudentDto,
  ): Promise<PaginateResult> {
    return await this.studentsService.getListStudent(body);
  }

  @Get('get-detail-student')
  async getDetailStudent(@Query('id') id: string): Promise<StudentEntity> {
    return await this.studentsService.getDetailStudent(id);
  }

  @Patch('update-student')
  async updateStudent(@Body() body: UpdateStudentDto) {
    await this.studentsService.updateStudent(body);
  }

  @Delete('delete-student')
  async deleteStudent(@Query('id') id: string) {
    await this.studentsService.deleteStudent(id);
  }
}
