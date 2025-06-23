import type { ScheduleResult } from "./optim.ts";

import { NotFound, Uninitialized } from "./optim.ts";

import Card from "./Card.tsx";

type SchedulePanelProps = {
  people: string[];
  schedule: ScheduleResult;
  tasks: string[];
  toTime: (time: number) => string;
};

const SchedulePanel = ({
  people,
  schedule,
  tasks,
  toTime,
}: SchedulePanelProps) => {
  if (schedule == Uninitialized) {
    return <div></div>;
  }

  if (schedule == NotFound) {
    return (
      <Card>
        <p>Unable to find a valid schedule.</p>
      </Card>
    );
  }

  const output: string[] = (() => {
    const output = people.map(() => "");
    schedule.forEach((row) => {
      const task: string = tasks[row.task];
      const start: string = toTime(row.startTime);

      output[row.person] += ` ${task}: ${start}`;
    });

    return output;
  })();

  const rendered = output.map((row, idx) => (
    <p key={row}>
      {people[idx]}: {row}
    </p>
  ));

  return (
    <Card>
      <div>
        <h1 className="text-lg text-semibold">Found a schedule</h1>
        {rendered}
      </div>
    </Card>
  );
};

export default SchedulePanel;
