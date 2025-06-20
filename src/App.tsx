import { useEffect, useState } from "react";

// components
import Table from "./Table.tsx";
import TimeSettings from "./TimeSettings.tsx";

const App = ({
  initialTimeSettings = {
    startTime: "05:15",
    endTime: "09:00",
  },
  persistKey = "hmua-app",
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
  const initialData = [
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
      person: "MOB",
      Hair: 45,
      Makeup: 45,
      Draping: 30,
      deadline: "13:30",
    },
    {
      id: 3,
      person: "MOG",
      Hair: 45,
      Makeup: 45,
      Draping: 30,
      deadline: "13:30",
    },
    {
      id: 4,
      person: "MoH",
      Hair: 45,
      Makeup: 45,
      Draping: 15,
      deadline: "13:45",
    },
  ];

  return (
    <div>
      <h1 className="text-center">HMUA Scheduler</h1>
      <TimeSettings timeSettings={timeSettings} updateTime={updateTime} />
      <Table data={initialData} tasks={tasks} />
    </div>
  );
};

export default App;
