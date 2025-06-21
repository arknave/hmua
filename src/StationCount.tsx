const StationCount = ({ changeStationCount, stations }) => {
  const counts = Object.entries(stations).map(([task, count]) => (
    <label key={task} className="mx-2 px-2">
      {task}
      <input
        type="number"
        min={1}
        className="mx-2 pl-1 w-12 text-center border rounded-sm"
        onChange={(e) => changeStationCount(task, e.target.value)}
        value={count}
      />
    </label>
  ));
  return (
    <div className="mb-2 p-4 bg-white rounded-lg flex grid grid-cols-1 md:grid-cols-4 gap-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        Task Counts
      </h3>
      {counts}
    </div>
  );
};

export default StationCount;
