import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsDate, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

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
  owner: User;
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer;
  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  wishlist: Wishlist;
}
