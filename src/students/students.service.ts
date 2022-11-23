import { NOT_FOUND_STUDENT } from './../utils/constant/message';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudentDto } from './dtos/create-student.dto';
import { GetListStudentDto } from './dtos/get-list-student.dto';
import {
  PaginateResult,
  EMAIL_ALREADY_EXISTS,
  PHONE_NUMBER_ALREADY_EXISTS,
} from 'src/utils';
import { UpdateStudentDto } from './dtos/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
  ) {}

  async emailExists(email: string) {
    const student = await this.studentRepo.findOne({
      where: {
        email,
      },
    });
    if (student) {
      throw new BadRequestException(EMAIL_ALREADY_EXISTS);
    }
  }

  async phoneExists(phone_number: string) {
    const student = await this.studentRepo.findOne({
      where: {
        phone_number,
      },
    });
    if (student) {
      throw new BadRequestException(PHONE_NUMBER_ALREADY_EXISTS);
    }
  }

  async createStudent(body: CreateStudentDto): Promise<StudentEntity> {
    await this.emailExists(body.email);
    await this.phoneExists(body.phone_number);

    const newStudent = this.studentRepo.create({
      id: uuidv4(),
      ...body,
    });
    await this.studentRepo.save(newStudent);
    return newStudent;
  }

  async getListStudent(body: GetListStudentDto): Promise<PaginateResult> {
    const { filter, paginate, order } = body;
    const query = this.studentRepo
      .createQueryBuilder('student')
      .where('student.fullname LIKE :fullname', {
        fullname: `%${filter.fullname}%`,
      })
      .andWhere('student.email LIKE :email', {
        email: `%${filter.email}%`,
      })
      .andWhere('student.phone_number LIKE :phone_number', {
        phone_number: `%${filter.phone_number}%`,
      });

    const total = await query.getCount();
    const data = await query
      .orderBy(order.by, order.direction)
      .skip(paginate.limit * (paginate.page - 1))
      .take(paginate.limit)
      .getMany();

    return {
      meta: {
        total,
        page: paginate.page,
      },
      data,
    };
  }

  async getDetailStudent(id: string): Promise<StudentEntity> {
    const student = await this.studentRepo.findOne({
      where: {
        id,
      },
    });
    if (!student) {
      throw new NotFoundException(NOT_FOUND_STUDENT);
    }
    return student;
  }

  async updateStudent(body: UpdateStudentDto) {
    const { id, ...rest } = body;
    const student = await this.getDetailStudent(id);
    if (student.email !== rest.email) {
      await this.emailExists(rest.email);
    }
    if (student.phone_number !== rest.phone_number) {
      await this.phoneExists(rest.phone_number);
    }
    await this.studentRepo.update({ id }, rest);
  }

  async deleteStudent(id: string) {
    const student = await this.getDetailStudent(id);
    await this.studentRepo.remove(student);
  }
}
