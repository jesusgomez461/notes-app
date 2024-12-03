/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { t } from "i18next";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "sonner";
import {
  ICategory,
  mutationFetchNewNote,
  mutationFetchUpdateNote,
  useFetchCategories,
} from "../../hooks";
import { SessionStore } from "../../store/store.session";
import {
  IFormikNewOrEditNote,
  IPropsNewOrEditNote,
} from "./NewOrEditNote.interface";

function NewOrEditNote({ note, setIsShowModal }: IPropsNewOrEditNote) {
  const { session } = SessionStore();
  const queryClient = useQueryClient();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchCategories();

  const formik = useFormik({
    initialValues: {
      title: note?.title || "",
      content: note?.content || "",
      category_id: note?.category || null,
    },
    enableReinitialize: true,
    validate: (values: IFormikNewOrEditNote) => {
      const errors: Record<string, string> = {};

      if (!values.title) {
        errors.title = t("requiredField");
      }

      if (!values.content) {
        errors.content = t("requiredField");
      }

      if (!values.category_id) {
        errors.category_id = t("requiredField");
      }

      return errors;
    },
    onSubmit: async (values: IFormikNewOrEditNote) => {
      try {
        toast.loading(note ? t("updatingNote") : t("creatingNote"), {
          description: t("pleaseWait"),
          duration: 3000000,
        });
        if (note) {
          await fetchUpdateNote({
            id: note.id,
            version: note.version,
            category_id: values.category_id?.id ?? 0,
            title: values.title,
            content: values.content,
            token: session?.access_token ?? "",
          });
        } else {
          await fetchNewNote({
            category_id: values.category_id?.id ?? 0,
            title: values.title,
            content: values.content,
            token: session?.access_token ?? "",
          });
        }
      } catch (error) {
        console.log(error);

        toast.dismiss();
      } finally {
        toast.dismiss();
      }
    },
  });

  const { mutateAsync: fetchUpdateNote, isPending: isPendingFetchUpdateNote } =
    useMutation({
      mutationFn: mutationFetchUpdateNote,
      onSuccess: async (res) => {
        console.log(res);

        if (res.status === 200) {
          toast.success(t("updateSuccessNote"), {
            duration: 4000,
          });
          formik.resetForm();
          setIsShowModal(false);
        } else {
          toast.error(t(`${res.data.detail}`), { duration: 3000 });
        }
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(t("error"), {
          description: t(error.response?.data?.detail ?? "unknownError"),
          duration: 6000,
        });
      },
    });

  const { mutateAsync: fetchNewNote, isPending: isPendingFetchNewNote } =
    useMutation({
      mutationFn: mutationFetchNewNote,
      onSuccess: async (res) => {
        if (res.status === 200) {
          toast.success(t("createSuccessNote"), {
            duration: 4000,
          });
          queryClient.invalidateQueries({ queryKey: ["notes"] });
          formik.resetForm();
          setIsShowModal(false);
        } else {
          toast.error(res.data.detail, { duration: 3000 });
        }
      },
      onError: (error: any) => {
        toast.error(t("error"), {
          description: t(error.response?.data.detail ?? 'unknownError'),
          duration: 6000,
        });
      },
    });

  const selectedCountryTemplate = (option: ICategory, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center gap-2">
          <span>{option.name}</span>
          <span
            className="flex border-round"
            style={{
              backgroundColor: `#${option.color}`,
              width: "12px",
              height: "12px",
            }}
          ></span>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option: ICategory) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.name}</span>
        <span
          className="flex border-round"
          style={{
            backgroundColor: `#${option.color}`,
            width: "12px",
            height: "12px",
          }}
        ></span>
      </div>
    );
  };

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-column gap-3"
      >
        <div className="w-full flex flex-column gap-1">
          <label htmlFor="title">{t("title")}</label>
          <InputText
            type="text"
            id="title"
            placeholder={t("title")}
            name="title"
            minLength={4}
            maxLength={50}
            onChange={(e) => formik.setFieldValue("title", e.target.value)}
            value={formik.values.title}
          />
          {formik.errors.title ? (
            <span className="error">{formik.errors.title}</span>
          ) : null}
        </div>
        <div className="w-full flex flex-column gap-1">
          <label htmlFor="content">{t("content")}</label>
          <InputTextarea
            name="content"
            id="content"
            className="w-full"
            maxLength={200}
            value={formik.values.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              formik.setFieldValue("content", e.target.value)
            }
            autoResize={true}
            rows={5}
            cols={30}
            placeholder={t("content")}
          />
          {formik.errors.content ? (
            <span className="error">{formik.errors.content}</span>
          ) : null}
        </div>
        <div className="w-full flex flex-column gap-1">
          <label htmlFor="category_id">{t("content")}</label>
          <Dropdown
            value={formik.values.category_id}
            options={categories}
            onChange={(e) => formik.setFieldValue("category_id", e.value)}
            name="category_id"
            style={{ width: "100%", height: "44px" }}
            loading={isLoadingCategories}
            itemTemplate={countryOptionTemplate}
            valueTemplate={selectedCountryTemplate}
            placeholder={t("selectCategory")}
            inputId="category_id"
          />
          {formik.errors.category_id ? (
            <span className="error">
              {formik.errors.category_id as unknown as string}
            </span>
          ) : null}
        </div>
        <div className="button-container mt-4 w-full flex justify-content-end">
          <Button label={t("cancel")} />
          <Button
            type="submit"
            loading={isPendingFetchUpdateNote || isPendingFetchNewNote}
            label={
              note
                ? t("saveElement", { element: t("note") })
                : t("createElement", { element: t("note") })
            }
          />
        </div>
      </form>
    </div>
  );
}

export default NewOrEditNote;
