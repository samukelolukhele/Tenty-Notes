import { User } from '../users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notes')
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Note unique identifier',
  })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', length: 100000 })
  body: string;

  @Column({ type: 'bigint' })
  authorId: number;

  @Column({ type: 'boolean' })
  is_pinned: boolean = false;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.note)
  author: User;
}
