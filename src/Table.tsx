import React, { useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const Table = () => {
  const [tasks, _setTasks] = useState(['Hair', 'Makeup', 'Draping']);

  /*
  const professionals = {
    'Hair': 2,
    'Makeup': 2,
    'Draping': 1,
  };
  const timeSettings = {
    startTime: '05:15',
    endTime: '09:00'
  };
  */

  const initialData = [
    { id: 1, person: 'Bride', 'Hair': 180, 'Makeup': 0, 'Draping': 0, deadline: '14:00' },
    { id: 2, person: 'MOB', 'Hair': 45, 'Makeup': 45, 'Draping': 30, deadline: '13:30' },
    { id: 3, person: 'MOG', 'Hair': 45, 'Makeup': 45, 'Draping': 30, deadline: '13:30' },
    { id: 4, person: 'MoH', 'Hair': 45, 'Makeup': 45, 'Draping': 15, deadline: '13:45' },
  ];

  const colDefs = useMemo(() => {
      const cols = [
          {
              field: 'person',
              headerName: 'Person',
              pinned: 'left',
              suppressMovable: true,
          },
          {
              field: 'deadline',
              headerName: 'Deadline',
          },
      ];
      tasks.forEach(task => {
          cols.push({
              field: task,
              headerName: task,
          });
      });

      return cols;
  }, [tasks]);

  const defaultColDef = useMemo(() => ({
      width: 100,
      filter: false,
      suppressMovable: false,
  }), []);

  const gridOptions = useMemo(() => ({
      suppressCellFocus: true,
  }), []);
 
  return (
    <div className="mx-auto w-96 h-256 text-center">
      <AgGridReact
        rowData={initialData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default Table;
