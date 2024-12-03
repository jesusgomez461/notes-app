/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { t } from "i18next";
import { Button } from "primereact/button";
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { toast } from "sonner";
import {
  mutationFetchNewCategory,
  mutationFetchUpdateCategory,
} from "../../hooks";
import { SessionStore } from "../../store/store.session";
import {
  IFormikNewOrEditCategory,
  IPropsNewOrEditCategory,
} from "./NewOrEditCategory.interface";

function NewOrEditCategory({
  category,
  setIsShowModal,
}: IPropsNewOrEditCategory) {
  const { session } = SessionStore();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      color: `#${category?.color ?? "ed9440"}`,
    },
    enableReinitialize: true,
    validate: (values: IFormikNewOrEditCategory) => {
      const errors: Record<string, string> = {};

      if (!values.name) {
        errors.name = t("requiredField");
      }

      if (!values.color) {
        errors.color = t("requiredField");
      }

      return errors;
    },
    onSubmit: async (values: IFormikNewOrEditCategory) => {
      try {
        toast.loading(
          category ? t("updatingCategory") : t("creatingCategory"),
          {
            description: t("pleaseWait"),
            duration: 3000000,
          }
        );
        if (category) {
          await fetchUpdateCategory({
            id: category.id,
            ...values,
            token: session?.access_token ?? "",
          });
        } else {
          await fetchNewCategory({
            ...values,
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

  const {
    mutateAsync: fetchUpdateCategory,
    isPending: isPendingFetchUpdateCategory,
  } = useMutation({
    mutationFn: mutationFetchUpdateCategory,
    onSuccess: async (res) => {
      if (res.status === 200) {
        toast.success(t("updateSuccessCategory"), {
          duration: 4000,
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        formik.resetForm();
        setIsShowModal(false);
      } else {
        toast.error(res.data.detail, { duration: 3000 });
      }
    },
    onError: (error: any) => {
      toast.error(t("error"), {
        description: t(error.response?.data.detail ?? "unknownError"),
        duration: 6000,
      });
    },
  });

  const {
    mutateAsync: fetchNewCategory,
    isPending: isPendingFetchNewCategory,
  } = useMutation({
    mutationFn: mutationFetchNewCategory,
    onSuccess: async (res) => {
      if (res.status === 200) {
        toast.success(t("createSuccessCategory"), {
          duration: 4000,
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        formik.resetForm();
        setIsShowModal(false);
      } else {
        toast.error(res.data.detail, { duration: 3000 });
      }
    },
    onError: (error: any) => {
      toast.error(t("error"), {
        description: t(error.response?.data.detail ?? "unknownError"),
        duration: 6000,
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-column gap-3"
      >
        <div className="w-full flex flex-column gap-1">
          <label htmlFor="name">{t("name")}</label>
          <InputText
            type="text"
            id="name"
            placeholder={t("name")}
            name="name"
            minLength={4}
            maxLength={50}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <span className="error">{formik.errors.name}</span>
          ) : null}
        </div>
        <div className="w-full flex flex-column gap-1">
          <label htmlFor="color">{t("color")}</label>
          <ColorPicker
            name="color"
            format="hex"
            inputId="color"
            value={formik.values.color}
            onChange={(e: ColorPickerChangeEvent) =>
              formik.setFieldValue("color", e.value)
            }
          />

          {formik.errors.color ? (
            <span className="error">{formik.errors.color}</span>
          ) : null}
        </div>
        <div className="button-container mt-4 w-full flex justify-content-end">
          <Button label={t("cancel")} />
          <Button
            type="submit"
            loading={isPendingFetchUpdateCategory || isPendingFetchNewCategory}
            label={
              category
                ? t("saveElement", { element: t("category") })
                : t("createElement", { element: t("category") })
            }
          />
        </div>
      </form>
    </div>
  );
}

export default NewOrEditCategory;
