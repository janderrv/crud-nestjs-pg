import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  @Inject(AuthorsService)
  private readonly service: AuthorsService;

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.service.getAuthor(id);
  }

  @Post()
  public createUser(@Body() body: CreateAuthorDto): Promise<Author> {
    return this.service.createAuthor(body);
  }
}
