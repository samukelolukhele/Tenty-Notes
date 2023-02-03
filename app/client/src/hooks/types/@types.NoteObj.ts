import { Note } from './@types.Note';

export interface NoteObj {
  items: Note[];
  links: { previous: string; next: string };
  meta: { currentPage: number; totalPages: number };
}
