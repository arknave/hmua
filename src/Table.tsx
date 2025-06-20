import React, { useMemo } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Table = ({ data, tasks, updateData }) => {
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

  return (
    <div className="mx-auto h-64 text-center">
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        readOnlyEdit={true}
        onCellEditRequest={updateData}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};

export default Table;
