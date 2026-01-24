import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsDate, Length} from 'class-validator';
import { User } from '../entities/users/entities/user.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsDate()
  createdAt: Date;
  @Column()
  @IsDate()
  updatedAt: Date;
  @Column()
  @Length(1, 250)
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
  @Length(1, 1024)
  description: string;
  @Column()
  copied: number;
  @ManyToOne(() => User, (user) => user.wishes)
  user: User;
}
