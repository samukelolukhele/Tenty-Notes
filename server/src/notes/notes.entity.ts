import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notes')
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Note unique identifier',
  })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  body: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'varchar' })
  authorId: string;

  @Column({ type: 'boolean' })
  isPinned: boolean = false;
}
