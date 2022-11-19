import { BaseEntity } from 'typeorm';
import { Note } from '../notes/notes.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    full_name: string;
    email: string;
    description: string;
    note: Note[];
    password: string;
    profile_image: string;
}
