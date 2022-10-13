import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'User unique identifier',
  })
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS);
    console.log(this.password);
  }
}
