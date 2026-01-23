import { Column, Entity, Length, PrimaryGeneratedColumn } from 'typeorm';

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
  @Length(1500)
  description: string;
  @Column()
  image: string;
}
