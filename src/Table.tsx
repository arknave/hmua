import React, { useMemo, useRef } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Table = ({ addPerson, data, deleteRows, tasks, updateData }) => {
  const colDefs = useMemo(() => {
    const cols = [
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

  const gridRef = useRef();

  const onDeleteRows = () => {
    const api = gridRef.current.api;
    const selected = api.getSelectedRows();
    const ids = selected.map((row) => row.id);

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
      <div className="toolbar flex grid grid-columns-6">
        <button
          className="flex bg-sky-500 mx-auto my-1 px-2 py-2 rounded-lg text-white"
          onClick={onDeleteRows}
        >
          Delete Selected Rows
        </button>
        <form action={addPersonForm}>
          <label>
            Name:
            <input name="personName" className="bg-white" />
          </label>
          <button
            className="flex bg-sky-500 mx-auto my-1 px-2 py-2 rounded-lg text-white"
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
