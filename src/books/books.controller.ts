import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { UpdateResult } from 'typeorm';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const result = await this.service.create(createBookDto);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get(':id')
  public async getBook(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    const result = await this.service.get(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Patch(':id')
  public async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBookDto,
  ): Promise<JSON> {
    const result = await this.service.update(id, body);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Delete(':id')
  public async deleteBook(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    const result = await this.service.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }

    return result;
  }
}
