import { useMemo, useRef } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Table = ({ addPerson, data, deleteRows, tasks, updateData }) => {
  const colDefs = useMemo(() => {
    const cols: any[] = [
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
    tasks.forEach((task) => {
      cols.push({
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
          max: 60 * 24,
          step: 15,
        },
        editable: true,
        field: task,
        headerName: task,
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

  const gridRef = useRef<any>(null);

  const onDeleteRows = () => {
    const api: any = gridRef.current.api;
    const selected: any = api.getSelectedRows();
    const ids: number[] = selected.map((row) => row.id);

    deleteRows(ids);
  };

  const addPersonForm = (formData) => {
    const name: string = formData.get("personName");
    if (name) {
      addPerson(name);
    }
  };

  return (
    <div className="mx-auto text-center">
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout={"autoHeight"}
        gridOptions={gridOptions}
        readOnlyEdit={true}
        ref={gridRef}
        rowSelection={{ mode: "multiRow" }}
        onCellEditRequest={updateData}
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
