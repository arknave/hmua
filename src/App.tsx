import { useState } from "react";

// components
import Table from "./Table.tsx";
import TimeSettings from "./TimeSettings.tsx";

const App = ({
  initialTimeSettings = {
    startTime: "05:15",
    endTime: "09:00",
  },
}) => {
  const [timeSettings, setTimeSettings] = useState(initialTimeSettings);

  const updateTime = (field, value) => {
    setTimeSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const people = ["Bride", "MoB", "MoG", "Bridesmaid"];
  const tasks = ["Hair", "Makeup", "Draping"];
  const [data, setData] = useState([
    {
      id: 1,
      person: "Bride",
      Hair: 180,
      Makeup: 0,
      Draping: 0,
      deadline: "14:00",
    },
    {
      id: 2,
      person: "MoB",
      Hair: 45,
      Makeup: 45,
      Draping: 30,
      deadline: "13:30",
    },
    {
      id: 3,
      person: "MoG",
      Hair: 45,
      Makeup: 45,
      Draping: 30,
      deadline: "13:30",
    },
    {
      id: 4,
      person: "Bridesmaid",
      Hair: 45,
      Makeup: 45,
      Draping: 15,
      deadline: "13:45",
    },
  ]);

  const updateData = (event: CellEditRequestEvent) => {
    const newValue = event.newValue;
    if (newValue == null) {
      return;
    }
    const changedId = event.data.id;
    const field = event.colDef.field;

    const newData = data.map((row) => {
      return row.id == changedId ? { ...row, [field]: newValue } : row;
    });
    setData(newData);
  };

  return (
    <div className="w-96 md:w-256 text-center">
      <h1 className="p-4 mx-auto text-xl font-bold">HMUA Scheduler</h1>
      <TimeSettings timeSettings={timeSettings} updateTime={updateTime} />
      <Table data={data} tasks={tasks} updateData={updateData} />
      <button
        className="bg-sky-500 hover:bg-fuchsia-500 mx-auto my-3 px-5 py-3 flex max-w-sm items-center rounded-md text-white"
        type="button"
      >
        Optimize
      </button>
    </div>
  );
};

export default App;
