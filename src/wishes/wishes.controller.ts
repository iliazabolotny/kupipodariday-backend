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
  HttpStatus,
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
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
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
  getWishById(@Param(':id') id: string) {
    return this.wishesService.findOne(+id);
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
