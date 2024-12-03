import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../api/notes-api";
import { SessionStore } from "../../store/store.session";
import {
  INote,
  IPropsDeleteNote,
  IPropsNewNote,
  IPropsPutNote,
} from "../interface";

async function fetchNotes(ctx: QueryFunctionContext<[string, string]>) {
  const [, jwt] = ctx.queryKey;
  const { data } = await api.get<INote[]>(`/notes`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
}

async function fetchNote(ctx: QueryFunctionContext<[string, number, string]>) {
  const [, id, jwt] = ctx.queryKey;
  const { data } = await api.get<INote>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
}

export function useFetchNotes() {
  const { session } = SessionStore();
  return useQuery({
    queryKey: ["notes", session?.access_token ?? ""],
    queryFn: fetchNotes,
    refetchOnWindowFocus: false,
  });
}

export function useFetchNote(id: number) {
  const { session } = SessionStore();

  return useQuery({
    queryKey: ["noteInformation", id, session?.access_token ?? ""],
    queryFn: fetchNote,
    refetchOnWindowFocus: true,
  });
}

export const mutationFetchNewNote = (newNote: IPropsNewNote) =>
  api.post("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${newNote.token}`,
    },
  });

export const mutationFetchUpdateNote = (note: IPropsPutNote) =>
  api.put(`/notes/${note.id}`, note, {
    headers: {
      Authorization: `Bearer ${note.token}`,
    },
  });

export const mutationFetchDeleteNote = ({ note, token }: IPropsDeleteNote) =>
  api.delete(`/notes/${note}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
