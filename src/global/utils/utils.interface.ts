export interface IGenerateRandomElement {
  length: number;
  type: TTypeRandomElement;
}

export interface IExtractCharacter {
  element: string;
  position?: number;
  isUppercase?: boolean;
}

export type TTypeRandomElement = "string" | "number";

export type TFormatTypeDate =
  | "yyyy-mm-dd"
  | "yyyy-mm-dd hh:mm:ss"
  | "yyyy-mm-dd hh:mm:ss AM/PM"
  | "dddd dd de mmmm del yyyy"
  | "dddd dd de mmmm del yyyy HH:mm:ss"
  | "dddd dd de mmmm del yyyy hh:mm:ss AM/PM";
