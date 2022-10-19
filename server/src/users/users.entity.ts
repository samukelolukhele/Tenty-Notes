import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

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

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: false, default: 'hacker.png' })
  profile_image: string;
}
