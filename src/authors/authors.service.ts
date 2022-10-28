import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  @InjectRepository(Author)
  private readonly repository: Repository<Author>;

  public getAuthor(id: number): Promise<Author> {
    return this.repository.findOneBy({ id });
  }

  public createAuthor(body: CreateAuthorDto): Promise<Author> {
    const author: Author = new Author();

    author.name = body.name;
    author.birthDate = body.birthDate;

    return this.repository.save(author);
  }
}
