import type { ScheduleResult } from "./optim.ts";
import type { Stations } from "./StationPanel.tsx";
import type { TableData } from "./Table.tsx";
import type { TimeSettings } from "./TimePanel.tsx";

import { useMemo, useState } from "react";
import { createSchedule, Uninitialized } from "./optim.ts";
import { fromHHMM, toHHMM } from "./time_utils.ts";

// components
import SchedulePanel from "./SchedulePanel.tsx";
import StationPanel from "./StationPanel.tsx";
import Table from "./Table.tsx";
import TimePanel from "./TimePanel.tsx";

const SCALE = 15;

const App = ({
  initialTimeSettings = {
    startTime: "05:15",
    endTime: "09:00",
  },
}: {
  initialTimeSettings?: TimeSettings;
}) => {
  const tasks = ["Hair", "Makeup", "Draping"];
  const [stations, setStations] = useState<Stations>(
    tasks.reduce((acc, task) => {
      return { ...acc, [task]: 1 };
    }, {}),
  );
  const [timeSettings, setTimeSettings] =
    useState<TimeSettings>(initialTimeSettings);
  const [data, setData] = useState<TableData>([
    {
      id: 1,
      person: "Bride",
      durations: [120, 0, 0],
      deadline: "07:30",
    },
    {
      id: 2,
      person: "MoB",
      durations: [45, 45, 30],
      deadline: "07:30",
    },
    {
      id: 3,
      person: "MoG",
      durations: [45, 45, 30],
      deadline: "07:30",
    },
    {
      id: 4,
      person: "Bridesmaid",
      durations: [45, 45, 15],
      deadline: "09:00",
    },
  ]);
  const [schedule, setSchedule] = useState<ScheduleResult>(Uninitialized);

  const people: string[] = useMemo(() => data.map((row) => row.person), [data]);

  const addPerson = (name: string) => {
    if (people.includes(name)) {
      return;
    }

    const nextId = Math.max(...data.map((row) => row.id)) + 1;

    setData((data) => [
      ...data,
      {
        id: nextId,
        person: name,
        durations: tasks.map(() => 0),
        deadline: timeSettings.endTime,
      },
    ]);
  };

  const deleteRows = (ids: number[]) => {
    setData((data) => data.filter((row) => !ids.includes(row.id)));
  };

  const updateTime = (field: string, value: string) => {
    setTimeSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDeadline = (changedId: number, deadline: string) => {
    setData((data) =>
      data.map((row) =>
        row.id == changedId
          ? {
              ...row,
              deadline,
            }
          : row,
      ),
    );
  };

  const updateDuration = (
    changedId: number,
    field: string,
    newValue: number,
  ) => {
    const fieldIndex: number = tasks.indexOf(field);

    setData((data) =>
      data.map((row) => {
        if (row.id == changedId) {
          const durations = row.durations.slice();
          durations[fieldIndex] = newValue;
          return { ...row, durations };
        } else {
          return row;
        }
      }),
    );
  };

  const start: number = useMemo(
    () => fromHHMM(timeSettings.startTime),
    [timeSettings],
  );
  // const end = fromHHMM(timeSettings.endTime);

  const optimize = () => {
    const matrix: number[][] = data.map((row) =>
      row.durations.map((x) => x / SCALE),
    );
    const numStations: number[] = tasks.map((task) => stations[task]);
    const deadlines: number[] = data.map(
      (row) => (fromHHMM(row.deadline) - start) / SCALE,
    );

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
      <TimePanel timeSettings={timeSettings} updateTime={updateTime} />
      <StationPanel
        changeStationCount={changeStationCount}
        stations={stations}
      />
      <Table
        addPerson={addPerson}
        data={data}
        deleteRows={deleteRows}
        tasks={tasks}
        updateDeadline={updateDeadline}
        updateDuration={updateDuration}
      />
      <button
        className="bg-sky-500 hover:bg-fuchsia-500 mx-auto my-3 px-5 py-3 flex max-w-sm items-center rounded-md text-white"
        type="button"
        onClick={optimize}
      >
        Optimize
      </button>
      <SchedulePanel
        people={people}
        schedule={schedule}
        tasks={tasks}
        toTime={toTime}
      />
      <p className="text-xs">
        Please enter all times in multiples of {SCALE} minutes.
      </p>
    </div>
  );
};

export default App;
