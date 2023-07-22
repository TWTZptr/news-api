import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPair } from './types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtPayload } from './types';
import { ExtractJwt } from 'passport-jwt';
import { AuthorizedUser } from './decorators/authorized-user.decorator';
import ms from 'ms';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokenPair = await this.authService.register(registerUserDto);
    return this.processTokenPair(tokenPair, response);
  }

  private processTokenPair(tokenPair: TokenPair, response: Response) {
    response.cookie('refreshToken', tokenPair.refreshToken, {
      expires: new Date(
        Date.now() +
          ms(
            this.configService.get<string>(
              'AUTH.REFRESH_TOKEN_EXPIRATION_TIME',
            ),
          ),
      ),
      sameSite: 'strict',
      httpOnly: true,
    });

    return {
      token: tokenPair.accessToken,
      expire: ms(
        this.configService.get<string>('AUTH.ACCESS_TOKEN_EXPIRATION_TIME'),
      ),
    };
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokenPair = await this.authService.tryLogin(loginUserDto);
    return this.processTokenPair(tokenPair, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken');
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @AuthorizedUser() user: JwtPayload,
  ) {
    const extractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const accessToken = extractor(request);
    const tokenPair = await this.authService.refreshTokenPair(
      accessToken,
      user,
    );
    return this.processTokenPair(tokenPair, response);
  }
}
