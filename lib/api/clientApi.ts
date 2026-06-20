import { NewNote, Note } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username?: string;
};

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
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await nextServer.post<Note>(`/notes`, newNote);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}

export async function register(userData: RegisterRequest): Promise<User> {
  const { data } = await nextServer.post<User>(`/auth/register`, userData);
  return data;
}

export async function login(userData: RegisterRequest): Promise<User> {
  const { data } = await nextServer.post<User>(`/auth/login`, userData);
  return data;
}

export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
