import type { CellEditRequestEvent, ColDef } from "ag-grid-community";

import { useMemo, useRef } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface TableRow {
  id: number;
  person: string;
  durations: number[];
  deadline: string;
}

export type TableData = TableRow[];

interface TableProps {
  addPerson: (name: string) => void;
  data: TableRow[];
  deleteRows: (ids: number[]) => void;
  tasks: string[];
  updateDeadline: (changedId: number, deadline: string) => void;
  updateDuration: (changedId: number, field: string, newValue: number) => void;
}

const Table = ({
  addPerson,
  data,
  deleteRows,
  tasks,
  updateDeadline,
  updateDuration,
}: TableProps) => {
  const colDefs = useMemo(() => {
    const cols: ColDef<TableRow>[] = [
      {
        field: "person",
        headerName: "Person",
        pinned: "left",
        suppressMovable: true,
      },
      {
        editable: true,
        field: "deadline",
        headerName: "Deadline",
      },
    ];
    tasks.forEach((task, index) => {
      cols.push({
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
          max: 60 * 24,
          step: 15,
        },
        editable: true,
        headerName: task,
        valueGetter: (p) => p.data?.durations[index],
      });
    });

    return cols;
  }, [tasks]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      filter: false,
      suppressMovable: false,
    }),
    [],
  );

  const gridOptions = useMemo(
    () => ({
      suppressCellFocus: true,
    }),
    [],
  );

  const gridRef = useRef<AgGridReact<TableRow>>(null);

  const updateDataEvent = (event: CellEditRequestEvent<TableRow>) => {
    const newValue = event.newValue;
    if (newValue == null) {
      return;
    }

    const changedId = event.data.id;
    const field = event.colDef.headerName;

    if (field == "deadline") {
      updateDeadline(changedId, newValue);
    } else if (field) {
      updateDuration(changedId, field, newValue);
    }
  };

  const onDeleteRows = () => {
    const api = gridRef.current?.api;
    if (api == null) {
      return;
    }

    const selected: TableData = api.getSelectedRows();
    const ids: number[] = selected.map((row: TableRow) => row.id);

    deleteRows(ids);
  };

  const addPersonForm = (formData: FormData) => {
    const name = formData.get("personName");
    if (name) {
      addPerson(name as string);
    }
  };

  return (
    <div className="mx-auto text-center">
      <AgGridReact<TableRow>
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout={"autoHeight"}
        gridOptions={gridOptions}
        readOnlyEdit={true}
        ref={gridRef}
        rowSelection={{ mode: "multiRow" }}
        onCellEditRequest={updateDataEvent}
        stopEditingWhenCellsLoseFocus={true}
      />
      {/*TODO: Disable if there are no selected rows*/}
      <div className="mx-auto my-2 flex items-center text-center gap-4">
        <button
          className="flex px-1 bg-sky-500 rounded-lg text-white"
          onClick={onDeleteRows}
        >
          Delete Selected Rows
        </button>
        <form action={addPersonForm} className="flex">
          <label className="flex mx-2">
            Name:
            <input name="personName" className="flex bg-white" />
          </label>
          <button
            className="flex px-1 bg-sky-500 rounded-lg text-white"
            type="submit"
          >
            Add Person
          </button>
        </form>
      </div>
    </div>
  );
};

export default Table;
