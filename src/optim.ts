type Task = { person: number; task: number; duration: number };
type Schedule = { person: number; task: number; startTime: number }[];

export type Uninitialized = "Uninitialized";
export type NotFound = "NotFound";
export type ScheduleResult = Schedule | Uninitialized | NotFound;

export const Uninitialized: Uninitialized = "Uninitialized";
export const NotFound: NotFound = "NotFound";

export function createSchedule(
  M: number[][], // M[i][j] = time for person i to do task j (0 if not needed)
  S: number[], // S[j] = number of stations for task j
  D: number[], // D[i] = deadline for person i
): ScheduleResult {
  const numPeople = M.length;
  const numTasks = M[0].length;

  const tasks: Task[] = [];
  for (let i = 0; i < numPeople; i++) {
    for (let j = 0; j < numTasks; j++) {
      if (M[i][j] > 0) {
        tasks.push({ person: i, task: j, duration: M[i][j] });
      }
    }
  }

  const schedule: Schedule = [];

  function isPersonBusy(person: number, start: number, end: number): boolean {
    return schedule.some(
      (s) =>
        s.person === person &&
        !(end <= s.startTime || start >= s.startTime + M[s.person][s.task]),
    );
  }

  function hasAvailableStation(
    task: number,
    start: number,
    end: number,
  ): boolean {
    const concurrent = schedule.filter(
      (s) =>
        s.task === task &&
        !(end <= s.startTime || start >= s.startTime + M[s.person][s.task]),
    ).length;
    return concurrent < S[task];
  }

  function backtrack(taskIndex: number): boolean {
    if (taskIndex === tasks.length) return true;

    const { person, task, duration } = tasks[taskIndex];

    for (let startTime = 0; startTime + duration <= D[person]; startTime++) {
      const endTime = startTime + duration;

      if (isPersonBusy(person, startTime, endTime)) continue;
      if (!hasAvailableStation(task, startTime, endTime)) continue;

      schedule.push({ person, task, startTime });

      if (backtrack(taskIndex + 1)) {
        return true;
      }

      schedule.pop();
    }

    return false;
  }

  return backtrack(0) ? schedule : "NotFound";
}
