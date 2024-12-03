import api from "../../api/notes-api";
import { IPropsDeleteNoteHistory, IPropsUpdateNoteHistory } from "../interface";

export const mutationFetchUpdateNoteHistory = (note: IPropsUpdateNoteHistory) =>
  api.put(`/notes-history/restore/${note.note_history}`, note, {
    headers: {
      Authorization: `Bearer ${note.token}`,
    },
  });

export const mutationFetchDeleteNoteHistory = ({
  note_history,
  token,
}: IPropsDeleteNoteHistory) =>
  api.delete(`/notes-history/${note_history}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
