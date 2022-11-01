import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Note } from 'src/notes/notes.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'User unique identifier',
  })
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 255, default: "Hey I'm on Tenty Notes!" })
  description: string;

  @OneToMany(() => Note, (note) => note.author)
  note: Note[];

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ nullable: false, default: 'hacker.png' })
  profile_image: string;
}
