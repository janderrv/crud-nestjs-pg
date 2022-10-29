import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 250 })
  public name: string;

  @Column({ type: 'varchar', length: 250 })
  public description: string;

  @ManyToOne(() => Author, (author: Author) => author.books)
  public author: Author;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
