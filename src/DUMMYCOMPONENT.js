import React from "react";
import AvailabilityComponent from "./AvailabilityComponent"; // Update the import path

const DUMMYCOMPONENT = () => {
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

  return <AvailabilityComponent availabilityData={availabilityData} />;
};

export default DUMMYCOMPONENT;
