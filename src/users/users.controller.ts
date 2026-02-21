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
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req) {
    const user = req.user;
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

  @UseGuards(JwtGuard)
  @Patch('me')
  patchMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    return bcrypt.hash(updateUserDto?.password, 10).then((hash) => {
      const result = {
        ...updateUserDto,
        password: hash,
      };
      return this.usersService.update(+user.id, result);
    });
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  getProfileWishes(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    return user.wishes;
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
    return user.wishes;
  }
}
