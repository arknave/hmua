import Card from "./Card.tsx";

import React from "react";

// TODO: tighten
export type Stations = { [key: string]: number };

interface StationPanelProps {
  changeStationCount: (task: string, count: number | null) => void;
  stations: Stations;
}

const StationPanel = ({ changeStationCount, stations }: StationPanelProps) => {
  const counts = Object.entries(stations).map(([task, count]) => (
    <label key={task} className="mx-2 px-2">
      {task}
      <input
        type="number"
        min={1}
        className="mx-2 pl-1 w-12 text-center border rounded-sm"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          changeStationCount(task, e.target.valueAsNumber);
        }}
        value={count}
      />
    </label>
  ));

  return (
    <Card>
      <div className="flex">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Task Counts
        </h3>
        {counts}
      </div>
    </Card>
  );
};

export default StationPanel;
