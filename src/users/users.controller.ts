import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Req, NotFoundException, HttpCode, HttpStatus, BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import bcrypt from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';
import { WishesService } from '../wishes/wishes.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private usersService: UsersService, private wishesService: WishesService) {}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Get('me')
  async getMe(@Req() req) {
    const currentUser = await this.usersService.findOne(req.user.id);
    return {
      id: currentUser.id,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updateAt,
      about: currentUser.about,
      avatar: currentUser.avatar,
      email: currentUser.email,
      username: currentUser.username,
    };
  }

  @Patch('me')
  async patchMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    return bcrypt.hash(updateUserDto?.password, 10).then((hash) => {
      const result = {
        ...updateUserDto,
        password: hash,
      };
      return this.usersService.update(+user.id, result);
    });
  }

  @Get('me/wishes')
  async getProfileWishes(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.wishesService.findWishesByUser(req.user);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return NotFoundException;
    }
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updateAt,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      username: user.username,
    };
  }

  @Get(':username/wishes')
  async getWishesByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return NotFoundException;
    }
    return await this.wishesService.findWishesByUser(user);
  }

  @Post('find')
  @HttpCode(HttpStatus.CREATED)
  async findUser(@Body() findUserDto: FindUserDto) {
    const searchingUser = findUserDto.query;
    if (!searchingUser) {
      throw new BadRequestException('Необходим Query параметр');
    }

    const preparedQuery = searchingUser.trim();
    return await this.usersService.searchUser(preparedQuery)
  }
}
