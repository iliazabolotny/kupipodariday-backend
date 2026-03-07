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
  HttpStatus, BadRequestException,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  async create(@Body() createWishDto: CreateWishDto) {
    await this.wishesService.create(createWishDto);
  }

  @Post(':id/copy')
  @UseGuards(JwtGuard)
  copyWish(@Param(':id') id: string, @Req() req) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    const targetWish = loggedUserWishes.find((wish) => wish.id === id);
    if (targetWish) {
      const result = {
        ...targetWish,
        copied: targetWish.copied + 1,
      };
      return this.wishesService.create(result);
    }
  }

  @Get('top')
  findTop(@Req() req) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    if (loggedUserWishes.length > 0) {
      return this.wishesService.getPopularWishes();
    }
  }

  @Get('last')
  @UseGuards(JwtGuard)
  findLast(@Req() req) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    if (loggedUserWishes.length > 0) {
      return this.wishesService.getRecentWishes();
    }
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getWishById(@Param('id') id: string) {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('Invalid ID format. ID must be a positive integer.');
    }

    return await this.wishesService.findOne(numericId);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    if (loggedUserWishes.find((wish) => wish.id === id)) {
      return this.wishesService.update(+id, updateWishDto);
    }
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Req() req, @Param('id') id: string) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    if (loggedUserWishes.find((wish) => wish.id === id)) {
      return this.wishesService.remove(+id);
    }
  }
}
