import TimeFormatter from "../../../util/TimeFormatter";
import { useEffect, useState } from "react";
const TimeSlotsComponent = ({ timeSlots, selectDateTime, setTimeSlotId, handleTimeSelection, onSelectedTypeChange, type }) => {
  const [selectedTyped] = useState(type)
  useEffect(() => {
    onSelectedTypeChange(selectedTyped)
  }, [selectedTyped])

  return (
    <div className="flex gap-3">
      {timeSlots.map((timeSlot) => (
        <li
          key={timeSlot.id}
          onClick={() => {
            if (timeSlot.to) {
              setTimeSlotId(timeSlot.id);
              handleTimeSelection(timeSlot.to);

            }
          }}
          className={`${selectDateTime.time === timeSlot.to
            ? "bg-verifiCation hover:bg-green-dark cursor-pointer text-white"
            : "bg-[#dcf9ff] hover:bg-verifiCation hover:text-white cursor-pointer"
            } font-sansRegular py-2 px-5 text-[13px] rounded-md`}
        >
          <TimeFormatter time={timeSlot.to} />
        </li>
      ))}
    </div>
  );
};


export default TimeSlotsComponent;