export interface Note {
  id: string | number;
  title: string;
  body: string;
  authorId: number | string;
  is_pinned: boolean;
  created_at: number | string;
  updated_at: number | string;
  author: any;
}
