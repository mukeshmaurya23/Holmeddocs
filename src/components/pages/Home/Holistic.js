import React, { useState, useEffect, useRef } from "react";
import leaf from "../../../images/home/Leaf.png";
import svgSearch from "../../../images/home/SearchBarIcon.svg";
import calendarSvg from "../../../images/home/Calendar.svg";
import grayDropDown from "../../../images/Login/GrayDropdown.png";

import { LocSpec } from "../../../constant";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../../../UI/Spinner";
import { fetchLocationAreas } from "../../../store/LocSpecSlice";
import DatePickerComponent from "../../../UI/DatePicker";
import customAxios from "../../../axios/custom";

const Holistic = () => {
  // const { data: LocSpecd, loading: locLoading } = useFetch(
  //   "/patient/master/state"
  // );
  const locationAreasDispatch = useDispatch();
  const [zip_code_id, setZipCodeId] = useState("");
  const [speciality_id, setSpecialityId] = useState("");
  const [condition_id, setConditionId] = useState("");
  const { locationAreas, status } = useSelector((state) => state.data);
  console.log(locationAreas);
  const { data: specialistData, loading: specialityLoading } = useFetch(
    "/patient/master/speciality"
  );

  const { data: conditionData, loading: conditionLoading } = useFetch(
    "/patient/master/condition"
  );

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const ref = useRef();
  const calendarRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setSelectedItem(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    locationAreasDispatch(fetchLocationAreas("/patient/master/areas"));
  }, [locationAreasDispatch]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (id) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === id ? null : id
    );
  };

  // const [selectedItemList, setSelectedItemList] = useState({
  //   location: "",
  //   specialitycondition: "",
  // });
  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
    conditions: "",
  });

  // const handleSelectedItem = (name, type) => {
  //   // setSelectedItemList(name);

  //   setSelectedItemList((prevSelectedItemList) => {
  //     return { ...prevSelectedItemList, [type]: name };
  //   });
  // };
  // const handleSelectedItem = (name, type) => {
  //   setSelectedItemList((prevSelectedItemList) => {
  //     let updatedItemList = { ...prevSelectedItemList };

  //     if (type === "specialitycondition") {
  //       if (updatedItemList.location && !updatedItemList.specialitycondition) {
  //         updatedItemList = {
  //           ...updatedItemList,
  //           location: "",
  //           specialitycondition: name,
  //         };
  //       } else {
  //         updatedItemList = {
  //           ...updatedItemList,
  //           specialitycondition: name,
  //         };
  //       }
  //     } else if (type === "location") {
  //       updatedItemList = {
  //         ...updatedItemList,
  //         location: name,
  //         specialitycondition: "",
  //       };
  //     }

  //     return updatedItemList;
  //   });
  // };
  const handleSelectedItem = (name, type, id) => {
    setSelectedItemList((prevSelectedItemList) => {
      let updatedItemList = { ...prevSelectedItemList };

      if (type === "location") {
        updatedItemList = {
          ...updatedItemList,
          location: name,
          speciality: "",
          conditions: "",
        };
      } else if (type === "speciality") {
        updatedItemList = {
          ...updatedItemList,
          speciality: name,
          speciality_id: id,
          conditions: "", // Clear the selected conditions when selecting a specialty
        };
      } else if (type === "conditions") {
        updatedItemList = {
          ...updatedItemList,

          conditions: name,
          condition_id: id,
          speciality: "", // Clear the selected specialty when selecting a conditions
        };
      }

      return updatedItemList;
    });
    if (type === "location") {
      const selectedItem = locationAreas.find((item) => item.city === name);
      if (selectedItem) {
        setZipCodeId(selectedItem.zip_code_id);
      }
    }
  };
  useEffect(() => {
    const selectedSpeciality = specialistData?.data?.result?.find(
      (item) => item.medical_speciality_name === selectedItemList.speciality
    );

    if (selectedSpeciality) {
      setSpecialityId(selectedSpeciality.id);
    } else {
      setSpecialityId("");
    }
  }, [selectedItemList.speciality, specialistData]);

  useEffect(() => {
    const selectedCondition = conditionData?.data?.result?.find(
      (item) => item.medical_condition_name === selectedItemList.conditions
    );
    if (selectedCondition) {
      setConditionId(selectedCondition.id);
    } else {
      setConditionId("");
    }
  }, [selectedItemList.conditions, conditionData]);

  const handleSearch = () => {
    let url = "/doctor-listing?";

    if (selectedItemList.location) {
      url += `location=${selectedItemList.location}_${zip_code_id}&`;
    }
    if (selectedItemList.speciality) {
      url += `speciality=${selectedItemList.speciality}_${speciality_id}&`;
    }
    if (selectedItemList.conditions) {
      url += `conditions=${selectedItemList.conditions}_${condition_id}&`;
    }

    url += `date=${startDate.toDateString()}`;

    navigate(url);
  };

  //create a api calls for handleSearcg
  // const [searchLocationItem, setSearchLocationItem] = useState([]);

  // // const searchLocationItemData = async (searchValue) => {
  // //   try {
  // //     const response = await customAxios.post("patient/master/areas", {
  // //       name: searchValue,
  // //     });
  // //     const data = response?.data?.data?.result || [];
  // //     setSearchLocationItem(data);
  // //     console.log(data);
  // //   } catch (error) {
  // //     console.log(error);
  // //   }
  // // };
  // const [searchValue, setSearchValue] = useState("");

  // const handleLocationSearch = (e) => {
  //   setSearchValue(e.target.value);
  // };

  // useEffect(() => {
  //   let isMounted = true; // Add a flag to track if the component is still mounted

  //   const fetchData = async () => {
  //     try {
  //       const response = await customAxios.post("patient/master/areas", {
  //         name: searchValue,
  //       });

  //       if (isMounted) {
  //         const data = response?.data?.data?.result || [];
  //         setSearchLocationItem(data);
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (searchValue) {
  //     const timer = setTimeout(fetchData, 300); // Delay the API call by 300 milliseconds to avoid frequent requests while typing

  //     return () => {
  //       clearTimeout(timer);
  //       isMounted = false;
  //     };
  //   }
  // }, [searchValue]);

  // const handleSearch = () => {
  //   //
  //   navigate(
  //     `/doctor-listing?location=${selectedItemList.location}&speciality=${
  //       selectedItemList.specialitycondition
  //     }&conditions=${selectedItemList.specialitycondition}
  //     &date=${startDate.toDateString()}`
  //   );
  // };
  // const handleSearch = () => {
  //   let url = "/doctor-listing?";

  //   if (selectedItemList.location) {
  //     url += `location=${selectedItemList.location}&`;
  //   }
  //   if (selectedItemList.specialitycondition) {
  //     url += `speciality=${selectedItemList.specialitycondition}&`;

  //   }

  //   url += `date=${startDate.toDateString()}`;

  //   navigate(url);
  // };

  // const locationItems = () => {
  //   if (status === "loading") {
  //     return <Spinner />;
  //   }

  //   return locationAreas?.map((item) => {
  //     return (
  //       <h1
  //         key={item.id}
  //         onClick={() =>
  //           handleSelectedItem(item.city, "location", item.zip_code_id)
  //         }
  //         className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-gray-700 tracking-[0.1rem]"
  //       >
  //         {item.city}
  //       </h1>
  //     );
  //   });
  // };
  const locationItems = () => {
    if (status === "loading") {
      return <Spinner />;
    }

    return locationAreas?.map((item) => {
      return (
        <h1
          key={item.id}
          onClick={() =>
            handleSelectedItem(item.city, "location", item.zip_code_id)
          }
          className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular text-[#292F33] font-semibold tracking-[1px]"
        >
          {item.city}
        </h1>
      );
    });
  };

  const SpecialityAndCondition = () => {
    if (specialityLoading || conditionLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <h2 className="font-sansBold text-gray-400 text-[13px] mb-2">
          Specialties
        </h2>
        {specialistData?.data?.result?.map((item) => (
          <h1
            key={item.id}
            onClick={() =>
              handleSelectedItem(
                item.medical_speciality_name,
                "speciality",
                item.id
              )
            }
            className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular  text-[#292F33] font-semibold tracking-[1px]"
          >
            {item.medical_speciality_name}
          </h1>
        ))}

        <h2 className="font-sansBold text-gray-400 text-[13px] py-2">
          Conditions
        </h2>
        {conditionData?.data?.result?.map((item) => (
          <h1
            key={item.id}
            onClick={() =>
              handleSelectedItem(
                item.medical_condition_name,
                "conditions",
                item.id
              )
            }
            className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-[#292F33]  tracking-[1px]"
          >
            {item.medical_condition_name}
          </h1>
        ))}
      </div>
    );
  };
  // const SpecialityAndCondition = () => {
  //   if (specialityLoading || conditionLoading) {
  //     return <Spinner />;
  //   }

  //   return (
  //     <div>
  //       <h2 className="font-sansBold text-gray-400 text-[13px] mb-2">
  //         Specialties
  //       </h2>
  //       {specialistData?.data?.result?.map((item) => (
  //         <h1
  //           key={item.id}
  //           onClick={() =>
  //             handleSelectedItem(
  //               item.medical_speciality_name,
  //               "specialitycondition"
  //             )
  //           }
  //           className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-gray-700 tracking-[0.1rem]"
  //         >
  //           {item.medical_speciality_name}
  //         </h1>
  //       ))}

  //       <h2 className="font-sansBold text-gray-400 text-[13px] py-2">
  //         Conditions
  //       </h2>
  //       {conditionData?.data?.result?.map((item) => (
  //         <h1
  //           key={item.id}
  //           onClick={() =>
  //             handleSelectedItem(
  //               item.medical_condition_name,
  //               "specialitycondition"
  //             )
  //           }
  //           className="cursor-pointer text-[12px] hover:underline mt-1 font-sansRegular font-semibold text-gray-700 tracking-[0.1rem]"
  //         >
  //           {item.medical_condition_name}
  //         </h1>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <div className="p-5 bg-[#E2F6F3] sm:h-[calc(100vh_-_7rem)] relative">
      <div className="bg-[#E2F6F3] flex items-center flex-col md:flex-row  ">
        <div className="mx-auto mt-[3rem] md:mt-[30vh]">
          <h1 className="flex font-sansRegular justify-center font-medium items-center sm:space-x-6 xs:space-x-4 xsm:space-x-3 md:text-[2.5rem] lg:text-[2.7rem] xl:text-[3rem]  sm:tracking-[4px] text-[#0C0B0B] sm:text-[2rem] xs:text-[1.8rem] xsm:text-[1.1rem] 2xl:text-[3.4rem] ">
            {/* <div className=" sm:pt-28 xs:pt-28 xsm:pt-16 mt-0  space-y-2">
          <h1 className="flex font-poppinsMedium 2xl:tracking-[8px] justify-center items-center sm:space-x-6 xs:space-x-4 xsm:space-x-3 md:text-[2.5rem] lg:text-[2.7rem] xl:text-[3rem] font-medium sm:tracking-[5px] text-[#0C0B0B] sm:text-[2rem] xs:text-[1.8rem] xsm:text-[1.1rem] 2xl:text-[3.4rem] "> */}
            <span>HOLISTIC</span>
            <div className="flex items-center justify-center">
              <div className="relative">
                <p>M</p>
                <img
                  className="absolute md:top-2 md:h-[3rem] md:left-[1.2px] 2xl:h-[3.4rem] sm:top-[.30rem] sm:h-[35px] xs:top-[.20rem] xs:h-[25px] xsm:h-[18px] xsm:top-[.12rem] xsm:font-sansBold"
                  alt=""
                  src={leaf}
                />
              </div>
              <p>EDICINE</p>
            </div>
            <p>CONNECTING</p>
          </h1>

          <h1 className="flex sm:text-[1.6rem] font-poppinItalic justify-center space-x-6 mt-5 tracking-widest font-[300] text-[#0C0B0B] md:text-[2.2rem] xsm:text-[0.8rem]">
            Mind. Body. Soul
          </h1>
        </div>
        <div className="mt-5 md:absolute 2xl:bottom-[2rem] md:bottom-10 right-0 left-0 mb-10 bg-white pl-3 md:px-5 rounded md:rounded-full mx-auto lg:w-[calc(100%_-_15%)] md:lg:w-[calc(100%_-_3%)] sm:w-[calc(100%_-_2%)] xsm:w-[calc(100%_-_2%)]">
          <div
            className="flex flex-col md:flex-row  justify-between px-4"
            ref={ref}
          >
            {/* <Accordion
              items={LocSpec}
              items2={LocSpecd?.data?.result}
              items3={specialistData?.data?.result}
              locLoading={locLoading}
              specialityLoading={specialityLoading}
              //items2={LocSpecd?.data?.result}
              // value={value}
              showBorder={false}
              image={grayDropDown}
              className="text-gray-600"
            /> */}
            {LocSpec.map((item) => {
              return (
                <>
                  <div
                    className="flex relative justify-between items-center "
                    key={item.id}
                  >
                    {/* <input
                      placeholder={item.title}
                      value={
                        selectedItemList[item.cId] || selectedItemList[item.id]
                      }
                      className={`font-sansBold text-[.8rem] md:text-[1rem] outline-none 2xl:text-[1.2rem] w-full text-[#636677] tracking-[2px] pr-8 pl-0 md:pl-[2rem]`}
                    ></input> */}
                    <input
                      placeholder={item.title}
                      value={
                        selectedItemList[item.cId] || selectedItemList[item.id]
                      }
                      className={`font-sansRegular text-[.8rem] md:text-[1rem] outline-none 2xl:text-[1.2rem] w-full text-[#000000] tracking-[2px] pr-8 pl-0 md:pl-[2rem] placeHolderText`}
                    />

                    <div
                      className=" cursor-pointer"
                      onClick={() => handleItemClick(item.id)}
                    >
                      <img
                        src={grayDropDown}
                        alt=""
                        className={`${
                          selectedItem === item.id ? "rotate-180" : ""
                        } cursor-pointer h-3 w-3 mr-8`}
                      />
                    </div>

                    <div
                      className={`${"border-l  border-none md:border-l lg:border-l border-gray-400 h-[50px] ml-10 mr-5"}`}
                    ></div>
                    {selectedItem === item.id && (
                      <div
                        className="absolute top-14 bg-white w-[400px] p-5 rounded-lg max-h-[30vh] overflow-y-auto"
                        style={{
                          zIndex: 1,
                        }}
                      >
                        {item.id === "location" && locationItems()}

                        {item.id === "speciality" || item.id === "conditions"
                          ? SpecialityAndCondition()
                          : null}
                      </div>
                    )}
                  </div>
                </>
              );
            })}
            {/* <div className="flex flex-row justify-between items-center flex-1 gap-[20px]">
              <h1 className="ml-5">Speciality</h1>
              <img src={grayDropDown} alt="dropdown" className="h-3 w-3" />
            </div> */}
            <div className="flex items-center mt-1 justify-between py-4 md:py-0 ">
              <div className="flex ml-0 md:ml-5">
                <img
                  onChange={handleDateChange}
                  src={calendarSvg}
                  alt=""
                  ref={calendarRef}
                  onClick={handleClick}
                  className="w-6 2xl:w-9 h-auto object-contain cursor-pointer mr-5 "
                />
                <span className="outline-none px-3 text-[.7rem] mt-1 sm:text-[1rem] 2xl:text-[1.2rem] text-[#000000] mr-20 font-semibold">
                  {startDate &&
                  startDate.toDateString() === new Date().toDateString()
                    ? "Today"
                    : startDate?.toLocaleDateString()}
                </span>

                {isOpen && (
                  <div className="absolute top-[4.4rem] right-10 z-[100] h-full">
                    <DatePickerComponent
                      handleChange={handleChange}
                      startDate={startDate}
                    />
                  </div>
                )}
              </div>

              <img
                src={grayDropDown}
                alt="dropdown"
                onClick={handleClick}
                className={`${isOpen ? "rotate-180" : ""} h-3 w-3 mr-10`}
              />

              <div className="hidden md:block" onClick={handleSearch}>
                <img
                  src={svgSearch}
                  alt=""
                  className=" w-16 2xl:w-24 h-auto cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="md:hidden pb-6 pt-3 pr-6">
            <button
              className="bg-gray-600 text-white w-full py-2 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holistic;
