import { ICategory } from "../../hooks";

export interface IPropsNewOrEditCategory {
  category: ICategory | null;
  setIsShowModal: (isShowModal: boolean) => void;
}

export interface IFormikNewOrEditCategory {
  name: string;
  color: string;
}
