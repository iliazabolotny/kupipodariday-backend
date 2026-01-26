import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../entities/users/entities/user.entity';
import { Wish } from '../entities/users/entities/wish.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  amount: number;
  @Column({default: false})
  hidden: boolean;
  @ManyToOne(() => User, (user) => user.offers)
  user: User;
  @OneToOne(() => Wish, (wish) => wish.offer)
  item: Wish;
}
