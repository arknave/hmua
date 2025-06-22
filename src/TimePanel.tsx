import { Clock } from "lucide-react";

export interface TimeSettings {
  startTime: string;
  endTime: string;
}

interface TimePanelProps {
  timeSettings: TimeSettings;
  updateTime: (field: string, value: string) => void;
}

const TimePanel = ({ timeSettings, updateTime }: TimePanelProps) => {
  return (
    <div className="mb-2 p-4 bg-white rounded-lg flex grid grid-cols-1 md:grid-cols-3 gap-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        Time Settings
        <Clock size={20} />
      </h3>
      <div className="flex items-center gap-2 text-center">
        <label>
          Start Time:
          <input
            type="time"
            step="900"
            value={timeSettings.startTime}
            onChange={(e) => updateTime("startTime", e.target.value)}
          />
        </label>
      </div>
      <div className="flex items-center gap-2 text-center">
        <label>
          End Time:
          <input
            type="time"
            step="900"
            value={timeSettings.endTime}
            onChange={(e) => updateTime("endTime", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default TimePanel;
