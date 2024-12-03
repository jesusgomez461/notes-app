import api from "../../api/notes-api";
import { IPropsLogin, IPropsRegister } from "../interface";

export const mutationFetchLogin = (loginInformation: IPropsLogin) =>
  api.post("/auth/login", loginInformation);

export const mutationFetchRegister = (newUser: IPropsRegister) =>
  api.post("/auth/register", newUser);
