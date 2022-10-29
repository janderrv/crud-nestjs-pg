import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,DeleteDateColumn 
} from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 250 })
  public name: string;

  @Column({ type: 'date' })
  public birthDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
