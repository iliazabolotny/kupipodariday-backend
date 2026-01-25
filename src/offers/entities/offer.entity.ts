import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../entities/users/entities/user.entity';

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
}
