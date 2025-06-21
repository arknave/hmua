export function fromHHMM(hhmm: string): number {
  const h = parseInt(hhmm.substr(0, 2));
  const m = parseInt(hhmm.substr(3, 5));

  return 60 * h + m;
}

export function toHHMM(time: number): string {
  const h = String(Math.floor(time / 60)).padStart(2, "0");
  const m = String(time % 60).padStart(2, "0");

  return `${h}:${m}`;
}
