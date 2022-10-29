import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Inject,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { UpdateResult } from 'typeorm';

@Controller('authors')
export class AuthorsController {
  @Inject(AuthorsService)
  private readonly service: AuthorsService;

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    const result = await this.service.getAuthor(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Post()
  public createUser(@Body() body: CreateAuthorDto): Promise<Author> {
    return this.service.createAuthor(body);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAuthorDto,
  ): Promise<JSON> {
    const result = await this.service.updateAuthor(id, body);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    const result = await this.service.deleteAuthor(id);

    if (!result.affected) {
      throw new NotFoundException();
    }

    return result;
  }
}
