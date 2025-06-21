const Schedule = ({ people, schedule, tasks, toTime }) => {
  if (schedule == null) {
    return <div></div>;
  }

  const output: string[] = people.map(() => "");
  schedule.forEach((row) => {
    const task: string = tasks[row.task];
    const start = toTime(row.startTime);

    output[row.person] += ` ${task}: ${start}`;
  });

  const rendered = output.map((row, idx) => (
    <p key={people[idx]}>
      {people[idx]}: {row}
    </p>
  ));

  return (
    <div>
      <h1>I have a schedule!</h1>
      {rendered}
    </div>
  );
};

export default Schedule;
