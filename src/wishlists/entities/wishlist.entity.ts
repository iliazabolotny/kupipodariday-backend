import { Column, Entity, Length, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../entities/users/entities/user.entity';
import { Wish } from '../entities/wishes/wish.entity';

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
