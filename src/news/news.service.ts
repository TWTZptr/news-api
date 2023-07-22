import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UNEXIST_NEWS_ID_MSG } from './constants';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
  ) {}

  create(createNewsDto: CreateNewsDto, authorId: number): Promise<News> {
    return this.newsRepository.save({ authorId, ...createNewsDto });
  }

  findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async update(
    id: number,
    { text, title }: UpdateNewsDto,
    userId: number,
  ): Promise<News> {
    if (!text && !title) {
      throw new BadRequestException();
    }
    await this.isNewsExistsAndCreatedByUser(id, userId);
    await this.newsRepository.update({ id }, { text, title });
    return this.newsRepository.findOneBy({ id });
  }

  async remove(id: number, userId: number): Promise<News> {
    const news = await this.isNewsExistsAndCreatedByUser(id, userId);
    await this.newsRepository.delete({ id });
    return news;
  }

  async isNewsExistsAndCreatedByUser(
    newsId: number,
    userId: number,
  ): Promise<News> {
    const news = await this.newsRepository.findOneBy({ id: newsId });

    if (!news) {
      throw new BadRequestException(UNEXIST_NEWS_ID_MSG);
    }

    if (news.authorId !== userId) {
      throw new ForbiddenException();
    }

    return news;
  }
}
