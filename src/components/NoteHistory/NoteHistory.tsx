/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Trans } from "react-i18next";
import { toast } from "sonner";
import { START_ICON_LIGHT } from "../../global";
import {
  INote,
  mutationFetchDeleteNoteHistory,
  mutationFetchUpdateNoteHistory,
} from "../../hooks";
import { SessionStore } from "../../store/store.session";
import { IPropsNoteHistory } from "./NoteHistory.interface";

function NoteHistory({ note }: IPropsNoteHistory) {
  const queryClient = useQueryClient();
  const { session } = SessionStore();

  const colorBody = (rowData: INote) => {
    console.log(rowData, note);

    return (
      <div className="flex gap-1 align-items-center justify-content-center">
        <span>{rowData.category?.name ?? ""}</span>
        <span
          className="flex border-round"
          style={{
            backgroundColor: `#${rowData.category?.color}`,
            width: "12px",
            height: "12px",
          }}
        ></span>
      </div>
    );
  };

  const { mutateAsync: mutateAsyncDeleteNoteHistory } = useMutation({
    mutationFn: mutationFetchDeleteNoteHistory,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        toast.success(t("deleteSuccessNote"), { duration: 3000 });
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      } else {
        toast.error(t("deleteErrorNote"), { duration: 3000 });
      }
    },
    onError: () => {
      toast.error(t("unknownError"), { duration: 3000 });
    },
  });

  const { mutateAsync: mutateAsyncUpdateNoteHistory } = useMutation({
    mutationFn: mutationFetchUpdateNoteHistory,
    onSuccess: (res: any) => {
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        toast.success(t("restoredNote"), { duration: 3000 });
      } else {
        toast.error(t("restoreNoteError"), { duration: 3000 });
      }
    },
    onError: () => {
      toast.error(t("unknownError"), { duration: 3000 });
    },
  });

  const actionsBody = (rowData: INote) => {
    return (
      <div className="w-full flex flex-row align-items-center justify-content-center gap-2 actions-body">
        <span
          title={t("restore")}
          onClick={async () => {
            try {
              toast.loading(t("restoringNote"), {
                duration: 3000000,
              });
              await mutateAsyncUpdateNoteHistory({
                note_history: rowData.id,
                token: session?.access_token ?? "",
              });
            } catch (error) {
              console.log(error, "error");
              toast.dismiss();
              toast.error(t("unknownError"), { duration: 5000 });
            } finally {
              toast.dismiss();
            }
          }}
        >
          <i className={`${START_ICON_LIGHT}history text-xl`}></i>
        </span>
        <span
          title={t("deleteElement", { element: rowData.title })}
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
                  await mutateAsyncDeleteNoteHistory({
                    note_history: rowData.id,
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

  return (
    <DataTable
      value={note.history}
      paginator
      rows={20}
      dataKey="id"
      showGridlines
      emptyMessage={t("emptyRecords")}
      removableSort
      scrollable
    >
      <Column
        field="title"
        header={t("title")}
        sortable
        style={{ minWidth: "14rem" }}
      />
      <Column
        field="content"
        header={t("content")}
        style={{ minWidth: "19rem" }}
        sortable
      />
      <Column
        field="category.name"
        header={t("category")}
        style={{ minWidth: "13rem" }}
        sortable
        body={colorBody}
      />
      <Column
        field="version"
        header={t("lastVersion")}
        style={{ minWidth: "5rem" }}
        align="center"
        sortable
      />
      <Column
        field="created"
        header={t("lastEdition")}
        style={{ minWidth: "10rem" }}
        sortable
      />
      <Column
        field="actions"
        header={t("actions")}
        style={{ minWidth: "5rem" }}
        align="center"
        body={actionsBody}
      />
    </DataTable>
  );
}

export default NoteHistory;
