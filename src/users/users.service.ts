import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const currentUsername = this.findByUsername(createUserDto.username);
    const email = this.findByEmail(createUserDto.email);
    if (!currentUsername && !email) {
      return bcrypt.hash(createUserDto.password, 10).then((hash) => {
        const result = {
          ...createUserDto,
          password: hash,
        };
        return this.userRepository.save(result);
      });
    } else {
      throw new ConflictException(
        'Пользователь с таким email или username уже существует',
      );
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
