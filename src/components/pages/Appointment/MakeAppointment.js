// import React, { useState, useRef, useEffect } from "react";
// import {} from "react-router-dom";
// import Input from "../../../util/Input";
// import greenArrowDown from "../../../images/GreenArrowDown.png";
// import greenArrowUp from "../../../images/home/WhiteDropdown.png";
// import calendar from "../../../images/home/Calendar.svg";
// import Button from "../../../util/Button";
// import DatePickerComponent from "../../../UI/DatePicker";
// import Footer from "../../../UI/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchLocationAreas,
//   fetchSpecialties,
// } from "../../../store/LocSpecSlice";

// const MakeAppointment = () => {
//   console.log("pathname", window.location.pathname);
//   const [isActive, setIsActive] = useState(false);
//   const toggleButtonHandler = () => {
//     setIsActive(!isActive);
//   };
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(true);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [isLocationDropdown, setIsLocationDropdown] = useState(false);
//   const [isSpecialityDropdown, setIsSpecialityDropdown] = useState(false);
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setShowDatePicker(false);
//   };
//   const toggleCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };
//   const [selectedItemList, setSelectedItemList] = useState({
//     location: "",
//     speciality: "",
//   });

//   const handleSelectedItem = (name, type) => {
//     // setSelectedItemList(name);
//     setSelectedItemList((prevSelectedItemList) => {
//       return { ...prevSelectedItemList, [type]: name };
//     });
//   };
//   const locAreasRef = useRef();
//   const specialityRef = useRef();
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!locAreasRef?.current?.contains(event.target)) {
//         setIsLocationDropdown(false);
//       }
//       if (!specialityRef?.current?.contains(event.target)) {
//         setIsSpecialityDropdown(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [locAreasRef, specialityRef]);

//   const locationAreasDispatch = useDispatch();

//   const { locationAreas, status } = useSelector((state) => state.data);

//   const specialityDispatch = useDispatch();
//   const { specialties, status: specStatus } = useSelector(
//     (state) => state.data
//   );

//   const handleLocationAreas = () => {
//     locationAreasDispatch(fetchLocationAreas("/patient/master/state"));
//     setIsLocationDropdown(true);
//   };

//   const handleSpeciality = () => {
//     specialityDispatch(fetchSpecialties("/patient/master/speciality"));
//     setIsSpecialityDropdown(true);
//   };

//   return (
//     <>
//       <div class="flex justify-center   ">
//         <div class="w-[370px] h-[220px] xs:w-[500px] xs:h-[250px] sm:w-[580px] sm:h-[300px] md:w-[580px] md:h-[300px] bg-[#0082822B] rounded-b-full  relative   ">
//           <div className=" bg-white shadow-2xl  absolute w-[300px] xs:w-[340px] sm:w-[390px] h-[calc(100vh_-_25vh)]    bottom-0 top-10  left-0 mx-auto right-0 ">
//             <div className="px-7 py-4 sm:px-7 sm:py-4 ">
//               <h2 className=" text-[#292F33] text-[1.1rem]  font-sansBold tracking-[1px] pt-4">
//                 Book Top Doctors Appointment
//               </h2>
//               <p className=" text-gray-400 text-[0.7rem]  font-sansRegular tracking-tight  pt-2">
//                 Thinking to consult a doctor this week? Use Holmeddoc to find
//                 the best doctors near you ..
//               </p>
//               <div className="border border-verifiCation w-full py-2 mt-4 flex justify-between items-center">
//                 <Input
//                   type="text"
//                   ref={locAreasRef}
//                   placeholder="City,Zip Code"
//                   className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
//                 />
//                 <img
//                   src={greenArrowDown}
//                   alt=""
//                   className="w-3 h-3 mr-2 cursor-pointer"
//                 />
//               </div>
//               <div className="relative border border-verifiCation w-full py-2 mt-8 flex justify-between items-center">
//                 <Input
//                   type="text"
//                   ref={specialityRef}
//                   placeholder="Specialty, Condition, Doctor..."
//                   className="relative outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
//                 />
//                 <img
//                   src={greenArrowDown}
//                   alt=""
//                   className="w-3 h-3 mr-2 cursor-pointer"
//                   onClick={handleSpeciality}
//                 />
//                 <ul
//                   className={`${
//                     isLocationDropdown
//                       ? "absolute top-[2.5rem] mt-1 px-6 max-h-60 min-w-[20rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
//                       : ""
//                   }`}
//                 >
//                   {isLocationDropdown
//                     ? locationAreas?.map((item) => (
//                         <h6
//                           className="cursor-pointer relative  mt-1  text-primary hover:bg-pink-100  "
//                           key={item.id}
//                           onClick={() =>
//                             handleSelectedItem(item?.city, "location")
//                           }
//                         >
//                           {item?.city}
//                         </h6>
//                       ))
//                     : null}
//                 </ul>
//               </div>

//               <div className="border border-verifiCation w-full py-2 mt-8 flex justify-between items-center">
//                 {/* <Input
//                   type="Today"
//                   placeholder="Today"
//                   className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
//                 /> */}
//                 <span className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular">
//                   12/12/2021
//                 </span>
//                 <img
//                   src={calendar}
//                   alt=""
//                   className="w-4 h-4 mr-2 cursor-pointer"
//                 />
//               </div>
//               <div className="border border-verifiCation w-full py-[6px] mt-8 flex justify-between items-center px-3">
//                 <Button
//                   onClick={toggleButtonHandler}
//                   className={`${
//                     !isActive ? "bg-[#008282] " : ""
//                   } py-1 px-3  sm:px-10 ${
//                     isActive ? "text-black" : "text-white"
//                   } text-[.9rem] tracking-[2px] font-sansRegular`}
//                 >
//                   InPerson
//                 </Button>
//                 <Button
//                   onClick={toggleButtonHandler}
//                   className={`${
//                     isActive ? "bg-[#008282] " : ""
//                   } py-1 px-3 sm:px-10 ${
//                     isActive ? "text-white" : "text-black"
//                   } text-[.9rem] tracking-[2px] font-sansRegular`}
//                 >
//                   Virtual
//                 </Button>
//               </div>
//               <div className="flex justify-center items-center mt-12">
//                 <Button className="bg-[#008282] py-2 px-10 mt-10 rounded-full text-white text-[.9rem] tracking-[2px] font-sansRegular">
//                   Search
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MakeAppointment;
import React, { useState, useRef, useEffect } from "react";
import {} from "react-router-dom";
import Input from "../../../util/Input";
import greenArrowDown from "../../../images/GreenArrowDown.png";
import greenArrowUp from "../../../images/home/WhiteDropdown.png";
import calendar from "../../../images/home/Calendar.svg";
import Button from "../../../util/Button";
import DatePickerComponent from "../../../UI/DatePicker";
import Footer from "../../../UI/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocationAreas,
  fetchSpecialties,
} from "../../../store/LocSpecSlice";

const MakeAppointment = () => {
  console.log("pathname", window.location.pathname);
  const [isActive, setIsActive] = useState(false);
  const toggleButtonHandler = () => {
    setIsActive(!isActive);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLocationDropdown, setIsLocationDropdown] = useState(false);
  const [isSpecialityDropdown, setIsSpecialityDropdown] = useState(false);
  const [locationDropdownArrow, setLocationDropdownArrow] = useState(false);
  const [specialityDropdownArrow, setSpecialityDropdownArrow] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
  });

  const handleSelectedItem = (name, type) => {
    setSelectedItemList((prevSelectedItemList) => {
      return { ...prevSelectedItemList, [type]: name };
    });
  };
  const locAreasRef = useRef();
  const specialityRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!locAreasRef?.current?.contains(event.target)) {
        setIsLocationDropdown(false);
      }
      if (!specialityRef?.current?.contains(event.target)) {
        setIsSpecialityDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [locAreasRef, specialityRef]);

  const locationAreasDispatch = useDispatch();

  const { locationAreas, status } = useSelector((state) => state.data);

  const specialityDispatch = useDispatch();
  const { specialties, status: specStatus } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    locationAreasDispatch(fetchLocationAreas("/patient/master/areas"));
    specialityDispatch(fetchSpecialties("/patient/master/speciality"));
  }, []);

  return (
    <>
      <div class="flex justify-center   ">
        <div class="w-[370px] h-[220px] xs:w-[500px] xs:h-[250px] sm:w-[580px] sm:h-[300px] md:w-[580px] md:h-[300px] bg-[#0082822B] rounded-b-full  relative   ">
          <div className=" bg-white shadow-2xl  absolute w-[300px] xs:w-[340px] sm:w-[390px] h-[calc(100vh_-_25vh)]    bottom-0 top-10  left-0 mx-auto right-0 ">
            <div className="px-7 py-4 sm:px-7 sm:py-4 ">
              <h2 className=" text-[#292F33] text-[1.1rem]  font-sansBold tracking-[1px] pt-4">
                Book Top Doctors Appointment
              </h2>
              <p className=" text-gray-400 text-[0.7rem]  font-sansRegular tracking-tight  pt-2">
                Thinking to consult a doctor this week? Use Holmeddoc to find
                the best doctors near you ..
              </p>
              <div className="border relative border-verifiCation w-full py-2 mt-4 flex justify-between items-center">
                <Input
                  type="text"
                  ref={locAreasRef}
                  placeholder="City,Zip Code"
                  className="outline-none relative px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  className={`w-3 h-3 mr-2 cursor-pointer ${
                    locationDropdownArrow ? "transform rotate-180" : ""
                  }`}
                  onClick={() => {
                    setLocationDropdownArrow(!locationDropdownArrow);
                    setIsLocationDropdown(true);
                  }}
                />
                <ul
                  class={`${
                    isLocationDropdown
                      ? "absolute top-16 bg-white z-20 px-4 py-3  cursor-pointer shadow-md rounded-md w-full space-y-1 overflow-auto max-h-[20rem]"
                      : ""
                  }`}
                >
                  {isLocationDropdown &&
                    locationAreas?.map((item) => (
                      <div class="mb-2">
                        <h6 class="relative cursor-default mt-1 select-none text-primary hover:bg-pink-100  ">
                          {item?.city}
                        </h6>
                      </div>
                    ))}
                </ul>
              </div>
              <div className="relative border border-verifiCation w-full py-2 mt-8 flex justify-between items-center">
                <Input
                  type="text"
                  ref={specialityRef}
                  placeholder="Specialty, Condition, Doctor..."
                  className="relative outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  className={`w-3 h-3 mr-2 cursor-pointer ${
                    specialityDropdownArrow ? "transform rotate-180" : ""
                  }`}
                />
              </div>

              <div className="border border-verifiCation w-full py-2 mt-8 flex justify-between items-center">
                {/* <Input
                  type="Today"
                  placeholder="Today"
                  className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular"
                /> */}
                <span className="outline-none px-3 text-[.7rem] sm:text-[.9rem] text-[#636677] tracking-[2px] font-sansRegular">
                  12/12/2021
                </span>
                <img
                  src={calendar}
                  alt=""
                  className="w-4 h-4 mr-2 cursor-pointer"
                />
              </div>
              <div className="border border-verifiCation w-full py-2 mt-8 flex justify-between items-center px-3">
                <Button
                  onClick={toggleButtonHandler}
                  className={`${
                    !isActive ? "bg-[#008282] " : ""
                  } py-1 px-3  sm:px-10 ${
                    isActive ? "text-black" : "text-white"
                  } text-[.9rem] tracking-[2px] font-sansRegular`}
                >
                  InPerson
                </Button>
                <Button
                  onClick={toggleButtonHandler}
                  className={`${
                    isActive ? "bg-[#008282] " : ""
                  } py-1 px-3 sm:px-10 ${
                    isActive ? "text-white" : "text-black"
                  } text-[.9rem] tracking-[2px] font-sansRegular`}
                >
                  Virtual
                </Button>
              </div>
              <div className="flex justify-center items-center mt-12">
                <Button className="bg-[#008282] py-2 px-10 mt-10 rounded-full text-white text-[.9rem] tracking-[2px] font-sansRegular">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeAppointment;
