import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
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

  public async updateAuthor(id: number, body: UpdateAuthorDto): Promise<JSON> {
    const author: Author = new Author();

    author.name = body.name;
    author.birthDate = body.birthDate;

    const result =  await this.repository.createQueryBuilder().update(author).where({ id, deletedAt: IsNull() }).returning('*').execute();
    return result.raw[0]
  }

  public deleteAuthor(id: number): Promise<UpdateResult> {
    return this.repository.createQueryBuilder().softDelete().where({ id, deletedAt: null}).execute();
  }
}
