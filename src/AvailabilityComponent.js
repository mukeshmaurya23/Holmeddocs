import React, { useState } from "react";
import moment from "moment";
const AvailabilityComponent = () => {
  const availabilityData = {
    
    "InPerson": [
        {
            "day": "Friday",
            "date": "2023-07-28",
            "value": []
        },
        {
            "day": "Saturday",
            "date": "2023-07-29",
            "value": []
        },
        {
            "day": "Sunday",
            "date": "2023-07-30",
            "value": [
                {
                    "id": 15,
                    "from": "00:00:00",
                    "to": "00:00:00",
                    "status": "available"
                }
            ]
        },
        {
            "day": "Monday",
            "date": "2023-07-31",
            "value": [
                {
                    "id": 17,
                    "from": "00:00:00",
                    "to": "01:00:00",
                    "status": "available"
                }
            ]
        },
        {
            "day": "Tuesday",
            "date": "2023-08-01",
            "value": []
        },
        {
            "day": "Wednesday",
            "date": "2023-08-02",
            "value": []
        },
        {
            "day": "Thursday",
            "date": "2023-08-03",
            "value": []
        }
    ],
    "Virtual": [
        {
            "day": "Friday",
            "date": "2023-07-28",
            "value": [
                {
                    "id": 18,
                    "from": "00:00:00",
                    "to": "06:00:00",
                    "status": "available"
                }
            ]
        },
        {
            "day": "Saturday",
            "date": "2023-07-29",
            "value": []
        },
        {
            "day": "Sunday",
            "date": "2023-07-30",
            "value": []
        },
        {
            "day": "Monday",
            "date": "2023-07-31",
            "value": [
                {
                    "id": 16,
                    "from": "15:15:00",
                    "to": "15:20:00",
                    "status": "available"
                }
            ]
        },
        {
            "day": "Tuesday",
            "date": "2023-08-01",
            "value": []
        },
        {
            "day": "Wednesday",
            "date": "2023-08-02",
            "value": []
        },
        {
            "day": "Thursday",
            "date": "2023-08-03",
            "value": []
        }
    ]

};
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      {
      availabilityData.InPerson.map((inPersonData) => {
        const formattedDate = inPersonData.date;
        const newFormatedDate = moment(formattedDate).format("DD MMM");
        //format this like 28 jul 

        const day = inPersonData.day;

        const virtualData = availabilityData.Virtual.find(
          (item) => item.date === formattedDate
        );
        console.log(virtualData,"...virtualData");

        return (
          <div key={formattedDate}>
            <p
              style={{ cursor: "pointer"
            
            }}
            className={`
                ${inPersonData.value.length > 0 || virtualData?.value.length > 0 ?"bg-green-500" :""}
            `}
              onClick={() => handleDateClick(formattedDate)}
            >
              Date: {newFormatedDate}
            </p>
            <p>Day: {day}</p>
            {selectedDate === formattedDate && (
              <div>
                {inPersonData.value.length > 0 && (
                  <div>
                    <p>InPerson:</p>
                    <ul>
                      {inPersonData?.value?.map((timeSlot) => (
                        <li key={timeSlot.id}>
                          From: {timeSlot.from} - To: {timeSlot.to}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {virtualData?.value.length > 0 && (
                  <div>
                    <p>Virtual:</p>
                    <ul>
                      {virtualData.value.map((timeSlot) => (
                        <li key={timeSlot.id}>
                          From: {timeSlot.from} - To: {timeSlot.to}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default AvailabilityComponent;
