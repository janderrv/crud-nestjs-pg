import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Book } from 'src/books/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 250, default: null })
  public name: string;

  @Column({ type: 'date', default: null })
  public birthDate: Date;

  @OneToMany(() => Book, (book: Book) => book.author)
  public books: Book[];

  @CreateDateColumn({ type: 'timestamp', default: null })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: null })
  public updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt?: Date;
}
