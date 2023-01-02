import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Note } from '../notes/notes.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'User unique identifier',
  })
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToMany(() => Note, (note) => note.author)
  note: Note[];

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ nullable: false, default: 'hacker.png' })
  profile_image: string;
}
