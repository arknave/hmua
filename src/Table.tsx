import React, { useMemo } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Table = ({ data, tasks }) => {
  const colDefs = useMemo(() => {
    const cols = [
      {
        field: "person",
        headerName: "Person",
        pinned: "left",
        suppressMovable: true,
      },
      {
        field: "deadline",
        headerName: "Deadline",
      },
    ];
    tasks.forEach((task) => {
      cols.push({
        field: task,
        headerName: task,
      });
    });

    return cols;
  }, [tasks]);

  const defaultColDef = useMemo(
    () => ({
      width: 100,
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
    <div className="mx-auto w-96 h-96 text-center md:w-128">
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default Table;
