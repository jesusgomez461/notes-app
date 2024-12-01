import { CHARACTERS } from "../constants";
import { IExtractCharacter, IGenerateRandomElement } from "./utils.interface";

export function generateRandomElement({
  length,
  type,
}: IGenerateRandomElement) {
  let result = "";

  if (type === "number") {
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
  } else if (type === "string") {
    const charactersLength = CHARACTERS.length;
    for (let i = 0; i < length; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  return result;
}

export function extractCharacter({
  element,
  position = 0,
  isUppercase = true,
}: IExtractCharacter) {
  if (isUppercase) {
    return element.charAt(position).toUpperCase();
  }
  return element.charAt(position);
}
