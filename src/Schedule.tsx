import type { ScheduleResult } from "./optim.ts";

import { NotFound, Uninitialized } from "./optim.ts";

type ScheduleProps = {
  people: string[];
  schedule: ScheduleResult;
  tasks: string[];
  toTime: (time: number) => string;
};

const Schedule = ({ people, schedule, tasks, toTime }: ScheduleProps) => {
  if (schedule == Uninitialized) {
    return <div></div>;
  }

  if (schedule == NotFound) {
    return <p>Unable to find a valid schedule.</p>;
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
    <div>
      <h1 className="text-lg text-semibold">I have a schedule!</h1>
      {rendered}
    </div>
  );
};

export default Schedule;
