import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  @InjectRepository(Book)
  private readonly repository: Repository<Book>;

  @Inject(AuthorsService)
  private readonly service: AuthorsService;

  public async create(body: CreateBookDto): Promise<Book> {
    const book: Book = new Book();
    const author: Author = await this.service.get(body.authorId);

    if (!author) {
      return null;
    }

    book.name = body.name;
    book.description = body.description;

    const newBook = this.repository.create({
      ...book,
      author,
    });

    await this.repository.save(newBook);

    return newBook;
  }

  public get(id: number): Promise<Book> {
    return this.repository.createQueryBuilder('book').innerJoinAndSelect('book.author', 'author').where({ id, deletedAt: IsNull() }).getOne();
  }

  public async update(id: number, body: UpdateBookDto): Promise<JSON> {
    const book: Book = new Book();

    book.name = body.name;
    book.description = body.description;

    const result = await this.repository
      .createQueryBuilder()
      .update(book)
      .where({ id, deletedAt: IsNull() })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  public delete(id: number): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .softDelete()
      .where({ id, deletedAt: IsNull() })
      .execute();
  }
}
