import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  Length,
  IsEmail,
  IsDate
} from '@nestjs/class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsDate()
  createdAt: Date;
  @Column()
  @IsDate()
  updatedAt: Date;
  @Column()
  @Length(2, 30)
  username: string;
  @Column({default: 'Пока ничего не рассказал о себе'})
  @Length(2, 200)
  about: string;
  @Column({default: 'https://i.pravatar.cc/300'})
  avatar: string;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  password: string;
}
