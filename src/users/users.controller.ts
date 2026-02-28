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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import bcrypt from 'bcryptjs';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Get('me')
  async getMe(@Req() req) {
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

  @Post('find')
  @HttpCode(HttpStatus.CREATED)
  async findUser(@Body() findUserDto: FindUserDto) {
    const searchingUser = findUserDto.query;
    const usersByUsername = await this.usersService.searchByUsername(
      searchingUser,
    );
    const usersByEmail = await this.usersService.searchByEmail(searchingUser);
    if (usersByUsername.length > 0 && usersByEmail.length === 0) {
      return usersByUsername;
    }
    if (usersByEmail.length > 0 && usersByUsername.length === 0) {
      return usersByEmail;
    }
    return [];
  }
}
