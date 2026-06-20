import { Note } from '@/types/note';
import { nextServer } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  searchQuery: string,
  currentPage: number,
  searchTag?: string
): Promise<NotesResponse> {
  const { data } = await nextServer.get<NotesResponse>(`/notes`, {
    params: {
      search: searchQuery,
      page: currentPage,
      tag: searchTag,
    },
  });
  return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
