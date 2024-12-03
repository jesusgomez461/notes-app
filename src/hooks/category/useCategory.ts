import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../api/notes-api";
import { SessionStore } from "../../store/store.session";
import {
  ICategory,
  IPropsDeleteCategory,
  IPropsNewCategory,
  IPropsPutCategory,
} from "../interface";

async function fetchCategories(ctx: QueryFunctionContext<[string, string]>) {
  const [, jwt] = ctx.queryKey;
  const { data } = await api.get<ICategory[]>(`/categories`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
}

async function fetchCategory(
  ctx: QueryFunctionContext<[string, number, string]>
) {
  const [, id, jwt] = ctx.queryKey;
  const { data } = await api.get<ICategory>(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
}

export function useFetchCategories() {
  const { session } = SessionStore();
  return useQuery({
    queryKey: ["categories", session?.access_token ?? ""],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
  });
}

export function useFetchCategory(id: number) {
  const { session } = SessionStore();

  return useQuery({
    queryKey: ["categoryInformation", id, session?.access_token ?? ""],
    queryFn: fetchCategory,
    refetchOnWindowFocus: true,
  });
}

export const mutationFetchNewCategory = (newCategory: IPropsNewCategory) =>
  api.post("/categories", newCategory, {
    headers: {
      Authorization: `Bearer ${newCategory.token}`,
    },
  });

export const mutationFetchUpdateCategory = (category: IPropsPutCategory) =>
  api.put(`/categories/${category.id}`, category, {
    headers: {
      Authorization: `Bearer ${category.token}`,
    },
  });

export const mutationFetchDeleteCategory = ({
  category,
  token,
}: IPropsDeleteCategory) =>
  api.delete(`/categories/${category}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
