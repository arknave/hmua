import Card from "./Card.tsx";

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
    <Card>
      <div className="flex gap-8 items-center">
        <h3 className="flex text-lg font-semibold gap-2 items-center">
          Time Settings
          <Clock size={20} />
        </h3>
        <div className="gap-2 text-center items-center">
          <label>
            Start Time:
            <input
              type="time"
              step="900"
              value={timeSettings.startTime}
              onChange={(e) => {
                updateTime("startTime", e.target.value);
              }}
            />
          </label>
        </div>
        <div className="gap-2 text-center items-center">
          <label>
            End Time:
            <input
              type="time"
              step="900"
              value={timeSettings.endTime}
              onChange={(e) => {
                updateTime("endTime", e.target.value);
              }}
            />
          </label>
        </div>
      </div>
    </Card>
  );
};

export default TimePanel;
