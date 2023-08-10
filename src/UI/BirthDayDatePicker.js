import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import moment from "moment";
const BirthDayDatePicker = ({ onBirthDateChange, marginTop }) => {
  const calendarRef = useRef();
  const [value, setValue] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState("");

  const maxVal = new Date();
  maxVal.setFullYear(maxVal.getFullYear() - 18);

  const minVal = new Date();
  minVal.setFullYear(minVal.getFullYear());
  //minVal.setMonth(minVal.getFullYear() - 80);
  console.log(moment(minVal).format("L"));
  console.log(moment(maxVal).format("L"), "Hello Calendar");
  const displayValue = value?.["_i"];
  useEffect(() => {
    const hideDropdown = (e) => {
      if (!calendarRef?.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    };
    window.addEventListener("click", hideDropdown, true);

    return () => {
      window.removeEventListener("click", hideDropdown, true);
    };
  }, []);

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("L");
    setBirthDate(formattedDate);

    onBirthDateChange(formattedDate);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="relative w-full" ref={calendarRef}>
          <input
            onClick={() => setShowDatePicker((item) => !item)}
            className={`w-full rounded border border-opacity-80 py-2 text-gray-800 placeHolderText placeholder:text-gray-400
                         text-sm px-2 outline-none  border-verifiCation `}
            placeholder="MM/DD/YYYY"
            readOnly
            style={{ marginTop }}
            value={birthDate}
            defaultValue={displayValue}
          />
          {showDatePicker && (
            <div className="absolute -left-[100%] top-[4rem] sm:top-[3.9rem] sm:-left-2 z-[100]">
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={value || moment(maxVal).format("L")}
                onChange={handleDateChange}
                onAccept={() => setShowDatePicker(false)}
                renderInput={(params) => <TextField {...params} />}
                className="h-[17.5rem]"
                maxDate={moment(maxVal).format("L")}
                openTo={"day"}
                views={["year", "month", "day"]}
              />
            </div>
          )}
        </div>
      </LocalizationProvider>
    </>
  );
};

export default BirthDayDatePicker;
