import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  image: string;
}
