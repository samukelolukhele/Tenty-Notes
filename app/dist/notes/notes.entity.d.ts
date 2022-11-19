import { User } from '../users/users.entity';
import { BaseEntity } from 'typeorm';
export declare class Note extends BaseEntity {
    id: number;
    title: string;
    body: string;
    authorId: number;
    is_pinned: boolean;
    created_at: Date;
    updated_at: Date;
    author: User;
}
