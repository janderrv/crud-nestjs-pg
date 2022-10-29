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

  @Column({ type: 'varchar', length: 250 })
  public name: string;

  @Column({ type: 'date' })
  public birthDate: Date;

  @OneToMany(() => Book, (book: Book) => book.author)
  public books: Book[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
