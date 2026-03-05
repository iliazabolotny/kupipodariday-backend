import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { WishesService } from '../wishes/wishes.service';

@Controller('offers')
@UseGuards(JwtGuard)
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService,
  ) {}

  @Post()
  async create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    const loggedUser = req.user;
    const loggedUserWishes = loggedUser.wishes;
    const targetWish = await this.wishesService.findOne(+createOfferDto.itemId);
    if (
      !loggedUserWishes.find((wish) => wish.id === createOfferDto.itemId) &&
      createOfferDto.amount <= targetWish.price
    ) {
      return this.offersService.create(createOfferDto);
    }
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
