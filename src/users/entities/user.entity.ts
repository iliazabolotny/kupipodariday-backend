import { Entity, Column, OneToMany } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  @Length(2, 30)
  username: string;
  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  about: string;
  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;
  @Column({ unique: true, select: false })
  @IsEmail()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Wish, (wish) => wish.owner, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wishes: Wish[];
  @OneToMany(() => Offer, (offer) => offer.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  offers: Offer[];
  @OneToMany(() => Wishlist, (wishlist) => wishlist.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wishlists: Wishlist[];
}
