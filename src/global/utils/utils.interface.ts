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
