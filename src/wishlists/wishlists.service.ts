import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistRepository.save(createWishlistDto);
  }

  findAll() {
    return this.wishlistRepository.find();
  }

  findOne(id: number) {
    return this.wishlistRepository.findOneBy({ id });
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository.update({ id }, updateWishlistDto);
  }

  remove(id: number) {
    return this.wishlistRepository.delete({ id });
  }
}
