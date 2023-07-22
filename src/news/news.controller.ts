import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorizedUser } from 'src/auth/decorators/authorized-user.decorator';
import { JwtPayload } from 'src/auth/types';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createNewsDto: CreateNewsDto,
    @AuthorizedUser() user: JwtPayload,
  ) {
    return this.newsService.create(createNewsDto, user.id);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
    @AuthorizedUser() user: JwtPayload,
  ) {
    return this.newsService.update(id, updateNewsDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthorizedUser() user: JwtPayload,
  ) {
    return this.newsService.remove(id, user.id);
  }
}
