import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  createUser(registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersRepository.save(registerUserDto);
  }
}
