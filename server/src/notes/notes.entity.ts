import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'bigint' })
  author_id: number;

  @Column({ type: 'boolean' })
  is_pinned: boolean = false;
}
