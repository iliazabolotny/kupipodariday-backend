import { forwardRef, Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wish]), forwardRef(()=>AuthModule)],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService],
})
export class WishesModule {}
