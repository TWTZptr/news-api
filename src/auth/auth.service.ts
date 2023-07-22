import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { PasswordsService } from 'src/passwords/passwords.service';
import { NOT_UNIQUE_EMAIL_MSG, INVALID_CREDENTIALS_MSG } from './constants';
import { ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, TokenPair } from './types';
import { User } from 'src/users/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordsService: PasswordsService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.findByEmail(registerUserDto.email);

    if (user) {
      throw new ConflictException(NOT_UNIQUE_EMAIL_MSG);
    }

    const hashedPassword = await this.passwordsService.hash(
      registerUserDto.password,
    );

    const createdUser = await this.usersService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });

    return this.generateTokenPair({ id: createdUser.id });
  }

  private generateTokenPair(payload: JwtPayload): TokenPair {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('AUTH.REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>(
          'AUTH.REFRESH_TOKEN_EXPIRATION_TIME',
        ),
      }),
    };
  }

  async tryLogin(loginUserDto: LoginUserDto): Promise<TokenPair> {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MSG);
    }

    return this.generateTokenPair({ id: user.id });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      (await this.passwordsService.compare(password, user.password))
    ) {
      return user;
    }
    return null;
  }
}
