import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signin(@Req() req) {
    /* Генерируем для пользователя JWT-токен */
    return this.authService.auth(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return await this.authService.auth(user);
  }
}
