import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { WishesService } from '../wishes/wishes.service';
import { Wish } from '../wishes/entities/wish.entity';

@Controller('wishlistlists')
@UseGuards(JwtGuard)
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService, private wishesService: WishesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWishlistDto: CreateWishlistDto, @Req()  req) {
    const resultWishes: Wish[] = [];
    for (let i = 0; i < createWishlistDto.itemsId.length; i++) {
      const wish = await this.wishesService.findOne(createWishlistDto.itemsId[i]);
      resultWishes.push(wish);
    }
    return this.wishlistsService.createWishlist(createWishlistDto, req.user, resultWishes);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('Некорректный id');
    }
    return this.wishlistsService.findOne(numericId);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('Некорректный id');
    }
    const wishlist = await this.wishlistsService.findOne(numericId);
    if (!wishlist) {
      throw new NotFoundException();
    }
    return await this.wishlistsService.saveWishlist(wishlist, updateWishlistDto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('Некорректный id');
    }
    const wishlist = await this.wishlistsService.findOne(numericId);
    if (!wishlist) {
      throw new NotFoundException();
    }
    return await this.wishlistsService.remove(+id);
  }
}
