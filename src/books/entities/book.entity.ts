import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 250, default: null })
  public name: string;

  @Column({ type: 'varchar', length: 250, default: null })
  public description: string;

  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  @ManyToOne(() => Author, (author) => author.books)
  public author: Author;

  @CreateDateColumn({ type: 'timestamp', default: null })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: null })
  public updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deletedAt?: Date;
}
