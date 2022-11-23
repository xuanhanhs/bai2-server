import { dateTransformer } from 'src/utils';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('student')
export class StudentEntity {
  @PrimaryColumn({ type: 'varchar', unique: true })
  readonly id: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({
    type: 'datetime',
    transformer: dateTransformer,
  })
  birthday: Date;

  @Column({ type: 'float' })
  score: number;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({
    type: 'datetime',
    transformer: dateTransformer,
  })
  enroll_date: Date;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
