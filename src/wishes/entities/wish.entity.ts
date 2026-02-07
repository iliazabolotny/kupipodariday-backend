import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsDate, Length, IsUrl, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Wish extends BaseEntity {
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
  @IsUrl()
  link: string;
  @Column()
  @IsUrl()
  image: string;
  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
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
