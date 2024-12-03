import { ICategory, INote } from "../../hooks";

export interface IFormikNewOrEditNote {
  title: string;
  content: string;
  category_id: ICategory | null;
}

export interface IPropsNewOrEditNote {
  note: INote | null;
  setIsShowModal: (value: boolean) => void;
}
