/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { FilterMatchMode, FilterService } from "primereact/api";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { toast } from "sonner";
import { formatDate, START_ICON_LIGHT } from "../../../global";
import { INote, mutationFetchDeleteNote, useFetchNotes } from "../../../hooks";
import { SessionStore } from "../../../store/store.session";
import NewOrEditNote from "../../NewOrEditNote/NewOrEditNote";
import NoteHistory from "../../NoteHistory/NoteHistory";

function Home() {
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    content: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "category.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_format: { value: null, matchMode: FilterMatchMode.DATE_IS },
    quantity_history_notes: {
      value: null,
      matchMode: FilterMatchMode.CUSTOM,
    },
  });
  FilterService.register(
    "custom_quantity_history_notes",
    (value: any, filters: any) => {
      const [from, to] = filters ?? [null, null];
      if (from === null && to === null) return true;
      if (from !== null && to === null) return from <= value;
      if (from === null && to !== null) return value <= to;
      return from <= value && value <= to;
    }
  );

  const { session } = SessionStore();
  const queryClient = useQueryClient();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const { data: notesInformation, isLoading: isLoadingNotes } = useFetchNotes();
  const [isNewOrEditModal, setIsNewOrEditModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<INote | null>(null);
  const [notes, setNotes] = useState<INote[]>([]);
  const [isShowNoteHistory, setIsShowNoteHistory] = useState(false);

  useEffect(() => {
    if (!isLoadingNotes && notesInformation) {
      const transformedNotes: INote[] = notesInformation.map((note: INote) => {
        return {
          ...note,
          created_format: formatDate(
            new Date(note.created),
            "yyyy-mm-dd hh:mm:ss AM/PM"
          ),
          quantity_history_notes: note.history.length,
        };
      });
      setNotes(transformedNotes);
    }
  }, [isLoadingNotes]);

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
      </div>
    );
  };

  const { mutateAsync: mutateAsyncDeleteNote } = useMutation({
    mutationFn: mutationFetchDeleteNote,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        toast.success(t("deleteSuccessNote"), { duration: 3000 });
        queryClient.invalidateQueries({ queryKey: ["notes"] });
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

  const actionsBody = (rowData: INote) => {
    return (
      <div className="w-full flex flex-row align-items-center justify-content-center gap-2 actions-body">
        <span
          title={t("editItem", { element: rowData.title })}
          onClick={() => {
            setNoteToEdit(rowData);
            setIsNewOrEditModal(true);
          }}
        >
          <i className={`${START_ICON_LIGHT}pen-to-square text-xl`}></i>
        </span>
        <span
          title={t("deleteNote")}
          onClick={() => {
            confirmDialog({
              message: (
                <Trans
                  i18nKey="doYouWantDeleteNote"
                  components={{ strong: <strong /> }}
                  values={{ element: rowData.title }}
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
                  await mutateAsyncDeleteNote({
                    note: rowData.id,
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
        <span>
          <i
            className={`${START_ICON_LIGHT}undo text-xl`}
            onClick={() => {
              setNoteToEdit(rowData);
              setIsShowNoteHistory(!isShowNoteHistory);
            }}
          ></i>
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const colorBody = (rowData: INote) => (
    <div className="flex gap-1 align-items-center justify-content-center">
      <span>{rowData.category.name}</span>
      <span
        className="flex border-round"
        style={{
          backgroundColor: `#${rowData.category.color}`,
          width: "12px",
          height: "12px",
        }}
      ></span>
    </div>
  );

  const containerTitle: JSX.Element = (
    <div className="flex flex-row justify-content-between">
      <div className="flex align-items-center gap-2">
        <i className={START_ICON_LIGHT + "pi-clipboard mt-1 text-main-color"} />
        <span className="text-xl">{t("notes")}</span>
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

  const historyNotesFilterTemplate = (options: any) => {
    const [from, to] = options.value ?? [null, null];
    return (
      <div className="flex align-items-center gap-1">
        <InputNumber
          style={{ width: "4rem" }}
          value={from}
          onChange={(e) => options.filterApplyCallback([e.value, to])}
          className="w-full"
          placeholder={t("fromFilter")}
        />
        -
        <InputNumber
          style={{ width: "4rem" }}
          value={to}
          onChange={(e) => options.filterApplyCallback([from, e.value])}
          className="w-full"
          placeholder={t("toFilter")}
        />
      </div>
    );
  };

  return (
    <Card title={containerTitle} className="p-1 m-3">
      <DataTable
        value={notes}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={isLoadingNotes}
        showGridlines
        removableSort
        globalFilterFields={[
          "title",
          "content",
          "category.name",
          "created_format",
          "quantity_history_notes",
        ]}
        header={header}
        emptyMessage={t("emptyRecords")}
        scrollable
        rowsPerPageOptions={[10, 25, 50, 100]}
      >
        <Column
          field="title"
          header={t("title")}
          filter
          sortable
          filterPlaceholder={t("searchElement", { filter: t("title") })}
          style={{ minWidth: "19rem" }}
        />
        <Column
          field="content"
          header={t("content")}
          style={{ minWidth: "19rem" }}
          filter
          sortable
          filterPlaceholder={t("searchElement", { filter: t("content") })}
        />
        <Column
          filterField="category.name"
          header={t("category")}
          style={{ minWidth: "19rem" }}
          filter
          sortField="category.name"
          sortable
          body={colorBody}
          filterPlaceholder={t("searchElement", { filter: t("category") })}
        />
        <Column
          field="quantity_history_notes"
          header={t("previousVersions")}
          style={{ minWidth: "19rem" }}
          filter
          sortable
          align="center"
          showFilterMatchModes={false}
          filterElement={historyNotesFilterTemplate}
        />
        <Column
          field="created_format"
          header={t("created")}
          style={{ maxWidth: "19rem" }}
          showFilterMatchModes={false}
          filter
          sortable
          filterType="date"
          filterPlaceholder={t("searchElement", { filter: t("created") })}
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
          noteToEdit
            ? t("editItem", { element: noteToEdit.title })
            : t("newNote")
        }
        draggable={false}
        visible={isNewOrEditModal}
        style={{ width: "50vw" }}
        onHide={() => setIsNewOrEditModal(!isNewOrEditModal)}
      >
        <NewOrEditNote note={noteToEdit} setIsShowModal={setIsNewOrEditModal} />
      </Dialog>
      <Dialog
        header={t("previousVersions")}
        draggable={false}
        visible={isShowNoteHistory}
        maximizable
        style={{ width: "80%" }}
        onHide={() => setIsShowNoteHistory(!isShowNoteHistory)}
      >
        {noteToEdit && <NoteHistory note={noteToEdit} />}
      </Dialog>
    </Card>
  );
}

export default Home;
