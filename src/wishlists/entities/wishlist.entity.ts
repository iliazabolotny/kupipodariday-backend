import { Column, Entity, Length, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../entities/users/entities/user.entity';

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
  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;
}
