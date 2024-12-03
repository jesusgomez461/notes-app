import { t } from "i18next";
import { CHARACTERS } from "../constants";
import {
  IExtractCharacter,
  IGenerateRandomElement,
  TFormatTypeDate,
} from "./utils.interface";

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

export function checkRequirements(value: string) {
  return {
    lowercase: /[a-z]/.test(value),
    uppercase: /[A-Z]/.test(value),
    numeric: /[0-9]/.test(value),
    minLength: value.length >= 8,
    specialChar: /[!¡@#$%^&*_+=.\-\\|?]/.test(value),
  };
}

export function formatDate(
  value: Date,
  formatType: TFormatTypeDate = "yyyy-mm-dd"
) {
  const year = value.getFullYear();
  const month = ("0" + (value.getMonth() + 1)).slice(-2);
  const day = ("0" + value.getDate()).slice(-2);
  const hours = value.getHours();
  const minutes = ("0" + value.getMinutes()).slice(-2);
  const seconds = ("0" + value.getSeconds()).slice(-2);

  const daysOfWeek: string[] = t("primereact.dayNames", {
    returnObjects: true,
  }) as unknown as string[];
  const monthsOfYear: string[] = t("primereact.monthNames", {
    returnObjects: true,
  }) as unknown as string[];

  const dayOfWeek = daysOfWeek[value.getDay()];
  const monthName = monthsOfYear[value.getMonth()];

  const hours12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = ("0" + hours12).slice(-2);

  switch (formatType) {
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;

    case "yyyy-mm-dd hh:mm:ss":
      return `${year}-${month}-${day} ${("0" + hours).slice(
        -2
      )}:${minutes}:${seconds}`;

    case "yyyy-mm-dd hh:mm:ss AM/PM":
      return `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;

    case "dddd dd de mmmm del yyyy":
      return `${dayOfWeek}, ${value.getDate()} ${monthName}, ${year}`;

    case "dddd dd de mmmm del yyyy HH:mm:ss":
      return `${dayOfWeek}, ${value.getDate()} ${monthName}, ${year} - ${hours}:${minutes}:${seconds}`;

    case "dddd dd de mmmm del yyyy hh:mm:ss AM/PM":
      return `${dayOfWeek}, ${value.getDate()} ${monthName}, ${year} - ${formattedHours}:${minutes}:${seconds} ${ampm}`;

    default:
      return "";
  }
}
