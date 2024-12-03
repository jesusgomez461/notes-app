export interface IPropsLogin {
  email: string;
  password: string;
}

export interface IPropsRegister {
  document: string;
  full_name: string;
  email: string;
  password: string;
}

export interface IPropsNewNote {
  title: string;
  content: string;
  category_id: number;
  token: string;
}

export interface INote {
  id: number;
  title: string;
  content: string;
  created: string;
  version: number;
  category: ICategory;
  history: INoteHistory[];
  created_format?: string;
  quantity_history_notes?: number;
}

export interface IUser {
  access_token: string;
  document: string;
  full_name: string;
  email: string;
}

export interface IPropsPutNote {
  id: number;
  title: string;
  content: string;
  category_id: number;
  version: number;
  token: string;
}

export interface IPropsDeleteNote {
  note: number;
  token: string;
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
}

export interface IPropsNewCategory {
  name: string;
  color: string;
  token: string;
}

export interface IPropsPutCategory {
  id: number;
  name: string;
  color: string;
  token: string;
}

export interface IPropsDeleteCategory {
  category: number;
  token: string;
}

export interface INoteHistory {
  id: number;
  content: string;
  created: string;
  note_id: number;
  title: string;
  version: number;
}

export interface IPropsDeleteNoteHistory {
  note_history: number;
  token: string;
}

export interface IPropsUpdateNoteHistory {
  note_history: number;
  token: string;
}
