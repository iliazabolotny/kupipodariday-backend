import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  username: string;
  @Column()
  avatar: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
