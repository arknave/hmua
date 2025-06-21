import { useMemo, useState } from "react";

import type { ScheduleResult } from "./optim.ts";
import { Uninitialized } from "./optim.ts";
import { createSchedule } from "./optim.ts";
import { fromHHMM, toHHMM } from "./time_utils.ts";

// components
import Schedule from "./Schedule.tsx";
import StationCount from "./StationCount.tsx";
import Table from "./Table.tsx";
import TimeSettings from "./TimeSettings.tsx";

const SCALE = 15;

const App = ({
  initialTimeSettings = {
    startTime: "05:15",
    endTime: "09:00",
  },
}) => {
  const tasks = ["Hair", "Makeup", "Draping"];
  const [stations, setStations] = useState(
    tasks.reduce((acc, task) => {
      return { ...acc, [task]: 1 };
    }, {}),
  );
  const [timeSettings, setTimeSettings] = useState(initialTimeSettings);
  const [data, setData] = useState([
    {
      id: 1,
      person: "Bride",
      Hair: 120,
      Makeup: 0,
      Draping: 0,
      deadline: "07:30",
    },
    {
      id: 2,
      person: "MoB",
      Hair: 45,
      Makeup: 45,
      Draping: 30,
      deadline: "07:30",
    },
    {
      id: 3,
      person: "MoG",
      Hair: 45,
      Makeup: 45,
      Draping: 30,
      deadline: "07:30",
    },
    {
      id: 4,
      person: "Bridesmaid",
      Hair: 45,
      Makeup: 45,
      Draping: 15,
      deadline: "09:00",
    },
  ]);
  const [schedule, setSchedule] = useState<ScheduleResult>(Uninitialized);

  const people: string[] = useMemo(() => data.map((row) => row.person), [data]);

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

  const updateTime = (field, value) => {
    setTimeSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const start: number = useMemo(
    () => fromHHMM(timeSettings.startTime),
    [timeSettings],
  );
  // const end = fromHHMM(timeSettings.endTime);

  const optimize = () => {
    const numPeople = data.length;
    const numTasks = tasks.length;

    const matrix: number[][] = Array.from({ length: numPeople }, () =>
      Array(numTasks),
    );
    const numStations: number[] = tasks.map((task) => stations[task]);
    const deadlines: number[] = new Array(numPeople);

    data.forEach((row, personIndex) => {
      tasks.forEach((task, taskIndex) => {
        matrix[personIndex][taskIndex] = row[task] / SCALE;
      });

      deadlines[personIndex] = (fromHHMM(row.deadline) - start) / SCALE;
    });

    setSchedule(createSchedule(matrix, numStations, deadlines));
  };

  const changeStationCount = (task: string, count: number | null) => {
    if (count == null || count <= 0) {
      return;
    }

    setStations({ ...stations, [task]: count });
  };

  const toTime = (time: number): string => {
    return toHHMM(time * SCALE + start);
  };

  return (
    <div className="w-96 md:w-256 text-center">
      <h1 className="p-4 mx-auto text-xl font-bold">HMUA Scheduler</h1>
      <TimeSettings timeSettings={timeSettings} updateTime={updateTime} />
      <StationCount
        changeStationCount={changeStationCount}
        stations={stations}
      />
      <Table data={data} tasks={tasks} updateData={updateData} />
      <button
        className="bg-sky-500 hover:bg-fuchsia-500 mx-auto my-3 px-5 py-3 flex max-w-sm items-center rounded-md text-white"
        type="button"
        onClick={optimize}
      >
        Optimize
      </button>
      <Schedule
        people={people}
        schedule={schedule}
        tasks={tasks}
        toTime={toTime}
      />
      <p className="text-xs">
        Please enter all times in muliples of 15 minutes.
      </p>
    </div>
  );
};

export default App;
