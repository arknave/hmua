import React, { useMemo, useRef } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Table = ({ data, deleteRows, tasks, updateData }) => {
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
      <button onClick={onDeleteRows}>Delete Rows</button>
    </div>
  );
};

export default Table;
