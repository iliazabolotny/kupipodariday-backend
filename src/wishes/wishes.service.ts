import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entities/wish.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto): Promise<Wish> {
    const createdWish = this.wishRepository.create(createWishDto);
    return this.wishRepository.save(createdWish);
  }

  findAll() {
    return this.wishRepository.find();
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }

    return wish;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update({ id }, updateWishDto);
  }

  remove(id: number) {
    return this.wishRepository.delete({ id });
  }

  async getRecentWishes(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async getPopularWishes(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 20,
    });
  }
}
