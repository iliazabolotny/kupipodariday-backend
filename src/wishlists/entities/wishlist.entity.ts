import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

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
  @OneToMany(() => Wish, (wish) => wish.wishlist)
  items: Wish[];
}
