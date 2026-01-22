import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Max, Min } from 'class-validator';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  @Min(1)
  @Max(250)
  name: string;
  @Column()
  link: string;
  @Column()
  image: string;
  @Column()
  price: number;
  @Column()
  raised: number;
  @Column()
  description: string;
  @Column()
  copied: string;
}
