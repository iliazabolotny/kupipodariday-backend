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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('wishlists')
@UseGuards(JwtGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    if (loggedUserWishes.find((wish) => wish.id === id)) {
      return this.wishlistsService.update(+id, updateWishlistDto);
    }
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    if (loggedUserWishes.find((wish) => wish.id === id)) {
      return this.wishlistsService.remove(+id);
    }
  }
}
