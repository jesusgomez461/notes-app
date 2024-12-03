/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { FilterMatchMode } from "primereact/api";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Trans } from "react-i18next";
import { toast } from "sonner";
import { START_ICON_LIGHT } from "../../../global";
import {
  ICategory,
  mutationFetchDeleteCategory,
  useFetchCategories,
} from "../../../hooks";
import { SessionStore } from "../../../store/store.session";
import NewOrEditCategory from "../../NewOrEditCategory/NewOrEditCategory";

function Category() {
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    color: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const { session } = SessionStore();
  const queryClient = useQueryClient();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchCategories();
  const [isNewOrEditModal, setIsNewOrEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters: any = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end align-items-center gap-2">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder={t("searchKeyWord")}
          />
        </IconField>
        <div className="cursor-pointer" onClick={clearFilter}>
          <i className={`${START_ICON_LIGHT}filter-slash`}></i>
        </div>
      </div>
    );
  };

  const clearFilter = () => {
    setGlobalFilterValue("");
  };

  const { mutateAsync: mutateAsyncDeleteCategory } = useMutation({
    mutationFn: mutationFetchDeleteCategory,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        toast.success(t("deleteSuccessNote"), { duration: 3000 });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
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

  const actionsBody = (rowData: ICategory) => {
    return (
      <div className="w-full flex flex-row align-items-center justify-content-center gap-2 actions-body">
        <span
          title={t("editCategory")}
          onClick={() => {
            setCategoryToEdit(rowData);
            setIsNewOrEditModal(true);
          }}
        >
          <i className={`${START_ICON_LIGHT}pen-to-square text-xl`}></i>
        </span>
        <span
          title={t("deleteCategory")}
          onClick={() => {
            confirmDialog({
              message: (
                <Trans
                  i18nKey="doYouWantDeleteNote"
                  components={{ strong: <strong /> }}
                  values={{ element: rowData.name }}
                />
              ),
              header: t("deleteConfirmation"),
              icon: START_ICON_LIGHT + "question-circle",
              acceptClassName: "p-button-danger",
              closeOnEscape: true,
              draggable: false,
              acceptLabel: t("delete"),
              rejectLabel: t("cancel"),
              async accept() {
                try {
                  toast.loading(t("deleteNoteWait"), {
                    duration: 3000000,
                  });
                  await mutateAsyncDeleteCategory({
                    category: rowData.id,
                    token: session?.access_token ?? "",
                  });
                } catch (error) {
                  console.log(error, "error");
                  toast.dismiss();
                  toast.error(t("unknownError"), { duration: 5000 });
                } finally {
                  toast.dismiss();
                }
              },
            });
          }}
        >
          <i className={`${START_ICON_LIGHT}trash text-xl`}></i>
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const containerTitle: JSX.Element = (
    <div className="flex flex-row justify-content-between">
      <div className="flex align-items-center gap-2">
        <i className={START_ICON_LIGHT + "pi-clipboard mt-1 text-main-color"} />
        <span className="text-xl">{t("categories")}</span>
      </div>
      <div className="flex gap-2 align-items-center align-content-center">
        <div
          className="border-button-add-element"
          onClick={() => {
            setIsNewOrEditModal(!isNewOrEditModal);
          }}
        >
          <i className={`${START_ICON_LIGHT}plus`}></i>
          <span className="font-normal">{t("new")}</span>
        </div>
      </div>
    </div>
  );

  const colorBody = (rowData: ICategory) => (
    <div className="flex gap-1 align-items-center justify-content-center">
      <span>{rowData.color}</span>
      <span
        className="flex border-round"
        style={{
          backgroundColor: `#${rowData.color}`,
          width: "12px",
          height: "12px",
        }}
      ></span>
    </div>
  );

  return (
    <Card title={containerTitle} className="p-1 m-3">
      <DataTable
        value={categories}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        showGridlines
        loading={isLoadingCategories}
        globalFilterFields={["title", "content"]}
        header={header}
        emptyMessage="No customers found."
      >
        <Column
          field="name"
          header={t("name")}
          filter
          filterPlaceholder={t("searchElement", { filter: t("name") })}
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="color"
          header={t("color")}
          body={colorBody}
          filter
          filterPlaceholder={t("searchElement", { filter: t("color") })}
        />
        <Column
          className="item-center"
          header={t("actions")}
          body={actionsBody}
          alignFrozen="right"
          frozen={true}
        />
      </DataTable>
      <Dialog
        header={
          categoryToEdit ? (
            <Trans
              i18nKey="editElement"
              components={{ strong: <strong /> }}
              values={{ element: categoryToEdit.name }}
            />
          ) : (
            t("newCategory")
          )
        }
        draggable={false}
        visible={isNewOrEditModal}
        style={{ width: "50vw" }}
        onHide={() => setIsNewOrEditModal(!isNewOrEditModal)}
      >
        <NewOrEditCategory
          category={categoryToEdit}
          setIsShowModal={setIsNewOrEditModal}
        />
      </Dialog>
    </Card>
  );
}

export default Category;
