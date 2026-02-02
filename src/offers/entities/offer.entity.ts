import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;
  @Column({ default: false })
  hidden: boolean;
  @ManyToOne(() => User, (user) => user.offers)
  user: User;
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
}
