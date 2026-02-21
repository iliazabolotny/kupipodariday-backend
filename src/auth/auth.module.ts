import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule],
  providers: [AuthService, JwtService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
