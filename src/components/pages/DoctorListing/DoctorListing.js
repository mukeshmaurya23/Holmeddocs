import React, { useState, useEffect, useRef } from "react";

import Pagination from "./Pagination";

import useFetch from "../../../hooks/useFetch";

import loadingGif from "../../../images/icons/Loader.gif";
import searchIcon from "../../../images/home/SearchBarIcon.svg";
import DoctorsList from "./DoctorsList";
import Footer from "../../../UI/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import customAxios from "../../../axios/custom";
import noDoctor from "../../../images/zerodoctor.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../../images/icons/Cross.png";
import { toggleFilterMenu } from "../../../store/mobileAppSlice";
import { encryptData, decryptData, SECRET_KEY } from "../../../util/EncDec";
let nameId = "";
let specialityId = [];
let conditionId = [];
let insuranceId = [];
let langaugeId = [];
const DoctorListing = () => {
  const [checkedIds, setCheckedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsList, setDoctorsList] = useState([]);
  const [filterDoctorList, setFilterDoctorList] = useState([]);
  const [filterDoctorSearchTerm, setFilterDoctorSearchTerm] = useState("");
  const [status, setStatus] = useState("idle");
  //const [nameId, setNameId] = useState("");

  const [reqBodyfilterData, setReqBodyFilterData] = useState([
    {
      language: [],
    },
    {
      speciality: [],
    },
    {
      insurance: [],
    },
    {
      conditions: [],
    },
    {
      appointment_type: "",
    },

    //appointment_type ://pending
  ]);

  //testing encodeed url

  // console.log(storeURL, "storeURL,,,,,,,,,,,,,,,,");
  const { data: filterData } = useFetch("/patient/filters");
  const [shouldCallAPI, setShouldCallAPI] = useState(true);
  const [time_slot_day, setTime_slot_day] = useState("");
  const [day, setDay] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  console.log(specialityId, "specialityId");

  const commonParams = {
    date: searchParams.get("date"),
    locationParams: searchParams.get("location"),
    specialityParams: searchParams.get("selectedSpeciality"),
    conditionParams: searchParams.get("selectedConditions"),
    insuranceParams: searchParams.get("selectedInsurance"),
    speciality: decryptData(searchParams.get("speciality"), SECRET_KEY),
    conditions: decryptData(searchParams.get("conditions"), SECRET_KEY),
    insurance: decryptData(searchParams.get("insurance"), SECRET_KEY),
    language: decryptData(searchParams.get("language"), SECRET_KEY),
    //speciality: searchParams.get("speciality"),
    appointment_type: searchParams.get("appointment_type"),
  };
  const toggleFilterDispatch = useDispatch();

  const zipCode = commonParams?.locationParams?.split("_")[1];

  // Internal Medicine_27, Integrative Medicine_52 get me 27,52 and so on..
  console.log(specialityId, "specialityId Mukesh");
  console.log(commonParams.speciality, "commonParams Mukesh");
  if (commonParams?.speciality) {
    let specialityIdArray = commonParams?.speciality?.split(",");
    specialityId = specialityIdArray.map((item) => {
      return item.split("_")[1];
    });
  }

  // useEffect(() => {
  //   if (commonParams?.speciality) {
  //     let specialityIdArray = commonParams?.speciality?.split(",");
  //     specialityId = specialityIdArray.map((item) => {
  //       return item.split("_")[1];
  //     });
  //     setReqBodyFilterData((prev) => {
  //       return {
  //         ...prev,
  //         speciality: specialityId,
  //       };
  //     });
  //   }
  // }, [commonParams?.speciality]);

  if (commonParams.specialityParams) {
    let specialityIdArray = commonParams?.specialityParams?.split(",");
    specialityId = specialityIdArray.map((item) => {
      return item.split("_")[1];
    });
  }

  if (commonParams?.conditions) {
    let conditionIdArray = commonParams?.conditions?.split(",");

    conditionId = conditionIdArray.map((item) => {
      return item.split("_")[1];
    });
  }

  if (commonParams?.conditionParams) {
    let conditionIdArray = commonParams?.conditionParams?.split(",");
    conditionId = conditionIdArray.map((item) => {
      return item.split("_")[1];
    });
  }

  if (commonParams?.insuranceParams) {
    let insuranceIdArray = commonParams?.insuranceParams?.split(",");
    insuranceId = insuranceIdArray.map((item) => {
      return item.split("_")[1];
    });
  }
  if (commonParams?.insurance) {
    let insuranceIdArray = commonParams?.insurance?.split(",");
    insuranceId = insuranceIdArray.map((item) => {
      return item.split("_")[1];
    });
  }

  if (commonParams?.language) {
    let languageIdArray = commonParams?.language?.split(",");
    langaugeId = languageIdArray.map((item) => {
      return item.split("_")[1];
    });
  }
  // if (commonParams?.conditionParams) {
  //   let conditionIdArray = commonParams?.conditionParams?.split(",");
  //   conditionId = conditionIdArray.map((item) => {
  //     return item.split("_")[1];
  //   });
  // }

  //const specialityId =
  // commonParams?.specialityParams?.split("_")[0] ||
  // commonParams?.speciality?.split("_")[0];

  //const conditionId = commonParams?.conditionParams?.split("_")[1];
  // const insuranceId = commonParams?.insuranceParams?.split("_")[1];

  const toggleFilterMenuHandler = () => {
    toggleFilterDispatch(toggleFilterMenu());
    window.scrollTo(0, 0);
  };

  const isMenuForFilter = useSelector(
    (state) => state.mobileApp.isMenuForFilter
  );
  const [viewAll, setViewAll] = useState(null);

  const openViewAll = (name) => {
    if (viewAll === name) {
      setViewAll(null);
    } else {
      setViewAll(name);
    }
  };

  const fetchAllDoctors = async () => {
    try {
      setStatus("loading");
      const response = await customAxios.post("/patient/doctors");
      const data = response?.data?.data?.result;
      setDoctorsList(data);

      setStatus("succeeded");
    } catch (error) {
      setStatus("failed");
    }
  };

  const handleMobileDoctorSearch = (e) => {
    console.log(e.target.value);
    setFilterDoctorSearchTerm(e.target.value);
    const filteredDoctors = doctorsList?.filter((doctor) => {
      return (
        doctor?.doctor_name
          ?.trim()
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        doctor?.medical_speciality?.[0]
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    });
    console.log(filteredDoctors, "filteredDoctors");
    setFilterDoctorList(filteredDoctors);
  };

  const fetchDoctorsData = async (day) => {
    setDay(day);
    setStatus("loading");
    //const specialtyParam = urlParams.get("speciality");
    // if(specialtyParam){
    //   const specialty = specialtyParam.split("_")[1];
    //   setSpecialityId(specialty);
    // }

    try {
      const response = await customAxios.post("/patient/doctors", {
        time_slot_day: day,
        serving_areas: zipCode,
        speciality: specialityId,
        conditions: conditionId,
        insurance: insuranceId,
        language: langaugeId,
        appointment_type: commonParams?.appointment_type,
      });

      const data = response?.data?.data?.result;
      setDoctorsList(data);
      setStatus("succeeded");
    } catch (error) {
      setStatus("failed");
    }
  };
  // useEffect(() => {
  //   const fetchAllDoctors = async () => {
  //     try {
  //       setStatus("loading");
  //       const response = await customAxios.post("/patient/doctors");
  //       const data = response?.data?.data?.result;
  //       setDoctorsList(data);
  //       setStatus("succeeded");
  //     } catch (error) {
  //       setStatus("failed");
  //     }
  //   };
  //   const currentDate = new Date();
  //   if (!commonParams?.date || commonParams?.date <) {
  //     fetchAllDoctors();
  //   } else {
  //     setStatus("succeeded");
  //   }
  // }, []);

  useEffect(() => {
    if (shouldCallAPI) {
      const urlParams = new URLSearchParams(window.location.search);
      const dateParam = urlParams.get("date");

      if (dateParam) {
        const dateObject = new Date(dateParam);
        const date = moment(dateParam).format("YYYY-MM-DD");
        const today = moment(new Date()).format("YYYY-MM-DD");
        console.log(date, "dateObject");
        console.log(today, "today");
        console.log(date >= today);
        if (date >= today) {
          console.log("workinhg");
          const dayOfWeek = dateObject.toLocaleDateString("en-US", {
            weekday: "long",
          });
          setTime_slot_day(dayOfWeek);
          fetchDoctorsData(dayOfWeek);
          setShouldCallAPI(true);
        } else {
          fetchAllDoctors();
        }
      }
    }
  }, [
    commonParams?.locationParams,
    commonParams?.specialityParams,
    commonParams?.conditionParams,

    commonParams?.insuranceParams,
    commonParams?.date,
    commonParams?.speciality,
    commonParams?.language,
    commonParams?.appointment_type,
    shouldCallAPI,
  ]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalCount = doctorsList?.length || 0;
  const pageSize = 4;
  const siblingCount = 1;

  const renderDoctorsList = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    if (status === "loading") {
      return (
        <div className="flex justify-center items-center w-full h-screen">
          <img src={loadingGif} alt="" />
        </div>
      );
    }
    // if (doctorsList?.length > 0 || filterDoctorList?.length > 0) {
    //   const paginatedData =
    //     doctorsList?.slice(startIndex, endIndex) || filterDoctorList;

    //   return <DoctorsList doctorsList={paginatedData} />;
    // }
    const currentData =
      filterDoctorList.length > 0 ? filterDoctorList : doctorsList;
    const paginatedData = currentData.slice(startIndex, endIndex);

    if (currentData.length > 0) {
      return <DoctorsList doctorsList={paginatedData} />;
    }
    return null;
  };

  const generateLabels = (category) => {
    const values = category.value;

    let displayedValues = values;

    if (category.title === "Language" && viewAll !== category.title) {
      displayedValues = values.slice(0, 3);
    } else if (category.title === "Insurance" && viewAll !== category.title) {
      displayedValues = values.slice(0, 4);
    } else if (category.title === "Conditions" && viewAll !== category.title) {
      displayedValues = values.slice(0, 3);
    } else if (category.title === "Specialty" && viewAll !== category.title) {
      displayedValues = values.slice(0, 3);
    }

    return displayedValues?.map((data) => generateLabel(data, category));
  };

  const generateLabel = (data, category) => {
    const filterCategoryKey = category.title
      .toLowerCase()
      .replace(" ", "_")
      .replace("specialty", "speciality");
    const isChecked = reqBodyfilterData.find((categoryData) =>
      categoryData[filterCategoryKey]?.includes(data.id)
    );

    const handleChange = async (e) => {
      const checked = e.target.checked;

      const originalId = e.target.id.split("-")[1];
      const filterCategoryKey = category.title.toLowerCase().replace(" ", "_");
      setShouldCallAPI(false);
      const id = data.id;
      const name =
        data.medical_speciality_name ||
        data.medical_condition_name ||
        data.insurance_company_name ||
        data.language_title;
      let newNameId = `${name}_${id}`;
      // setNameId((prevNameId) => {
      //   if (prevNameId) {
      //     return `${prevNameId}, ${newNameId}`;
      //   } else {
      //     return newNameId;
      //   }
      // });

      if (nameId) {
        nameId = nameId.concat(",", newNameId);
      } else {
        nameId = newNameId;
      }

      const appointment_type = data;

      if (checked) {
        if (commonParams?.speciality) {
          console.log("speciality already checked", commonParams?.speciality);
          let specialityIdArray = commonParams?.speciality?.split(",");
          specialityId = specialityIdArray.map((item) => {
            return item.split("_")[1];
          });
        }
        if (commonParams.conditions) {
          console.log("conditions already checked", commonParams?.conditions);
          let conditionsIdArray = commonParams?.conditions?.split(",");
          conditionId = conditionsIdArray.map((item) => {
            return item.split("_")[1];
          });
        }
        setCheckedIds((prevCheckedIds) => [...prevCheckedIds, originalId]);

        // Update reqBodyfilterData
        setReqBodyFilterData((prevData) => {
          const updatedData = prevData.map((categoryData) => {
            const key = Object.keys(categoryData)[0];
            // Replace "specialty" with "speciality" in the filterCategoryKey
            const updatedFilterCategoryKey =
              key === "specialty" ? "speciality" : key;

            if (updatedFilterCategoryKey === filterCategoryKey) {
              return {
                [updatedFilterCategoryKey]: [...categoryData[key], originalId],
              };
            }
            return categoryData;
          });
          return updatedData;
        });
        // setReqBodyFilterData((prevData) => {
        //   return prevData.map((categoryData) => {
        //     const key = Object.keys(categoryData)[0];
        //     // Replace "specialty" with "speciality" in the filterCategoryKey
        //     const updatedFilterCategoryKey =
        //       key === "specialty" ? "speciality" : key;

        //     if (updatedFilterCategoryKey === filterCategoryKey) {
        //       // Append both existing and new specialityId to the "speciality" key
        //       return {
        //         [updatedFilterCategoryKey]: [
        //           ...categoryData[key],
        //           ...specialityId,
        //           originalId,
        //         ],
        //       };
        //     }
        //     return categoryData;
        //   });
        // });
      } else {
        // Use the originalId instead of data.id
        setCheckedIds((prevCheckedIds) =>
          prevCheckedIds.filter((checkedId) => checkedId !== originalId)
        );

        // Update reqBodyfilterData
        setReqBodyFilterData((prevData) => {
          const updatedData = prevData.map((categoryData) => {
            const key = Object.keys(categoryData)[0];
            // Replace "specialty" with "speciality" in the filterCategoryKey
            const updatedFilterCategoryKey =
              key === "specialty" ? "speciality" : key;

            if (updatedFilterCategoryKey === filterCategoryKey) {
              return {
                [updatedFilterCategoryKey]: categoryData[key].filter(
                  (checkedId) => checkedId !== originalId
                ),
              };
            }
            return categoryData;
          });
          return updatedData;
        });
      }

      let filterTitle = category.title.toLowerCase().replace(" ", "_");
      filterTitle = filterTitle.replace("specialty", "speciality");
      filterTitle = filterTitle.replace("appointment type", "appointment_type");
      const newReqBodyFilterData = [...reqBodyfilterData];

      // Find the filter category in the newReqBodyFilterData based on the filterTitle
      const filterCategoryIndex = newReqBodyFilterData.findIndex(
        (categoryData) => Object.keys(categoryData)[0] === filterTitle
      );

      // If the filter category exists in the newReqBodyFilterData
      if (filterCategoryIndex !== -1) {
        const filterCategory = newReqBodyFilterData[filterCategoryIndex];
        const filterCategoryKey = Object.keys(filterCategory)[0];
        console.log(filterCategoryKey, "filterCategoryKey");

        if (filterCategoryKey === "appointment_type") {
          filterCategory[filterCategoryKey] = checked ? appointment_type : null;
        } else {
          filterCategory[filterCategoryKey] = checked
            ? [...filterCategory[filterCategoryKey], id]
            : filterCategory[filterCategoryKey].filter(
                (checkedId) => checkedId !== id
              );
        }
      }

      setReqBodyFilterData(newReqBodyFilterData);

      const requestBody = newReqBodyFilterData.reduce(
        (acc, cur) => ({ ...acc, ...cur }),
        {
          time_slot_day: day,
        }
      );

      if (checked) {
        console.log(name, appointment_type, id, "name,appointment_type,id");
        let encryptedData = nameId;
        console.log(encryptedData, "encryptedData");
        console.log(encryptData(encryptedData, SECRET_KEY), "Mukesh Condition");

        //let valueToAdd = SUJITDATA;
        console.log(
          category.title.toLowerCase(),
          "category.title toLowercase()"
        );
        let filterTitle = category.title.toLowerCase().replace(" ", "_");
        filterTitle = filterTitle.replace("specialty", "speciality");
        const valueToAdd =
          filterTitle.toLowerCase() === "appointment_type"
            ? appointment_type
            : name
            ? encryptData(encryptedData, SECRET_KEY) //
            : // ? `${name}_${id}`
              // id;
              encryptData(encryptedData, SECRET_KEY);
        // const valueToAdd =
        //   filterTitle.toLowerCase() === "appointment_type"
        //     ? appointment_type
        //     : name
        //       ? encryptData(`${name}_${id}`, SECRET_KEY) //
        //       : // ? `${name}_${id}`
        //       // id;
        //       encryptData(id, SECRET_KEY);

        searchParams.set(filterTitle, valueToAdd);
        // searchParams.set(
        //   filterTitle,

        //   filterTitle.toLowerCase() === "appointment_type"
        //     ? appointment_type
        //     : [
        //         ` ${name} ? ${name}_${id} :${id}`,
        //       ]
        // );
      } else {
        searchParams.delete(filterTitle);
      }
      navigate(`?${searchParams.toString()}`);

      try {
        setStatus("loading");
        const filterResponse = await customAxios.post(
          "/patient/doctors",
          requestBody
        );
        const filterData = filterResponse?.data?.data?.result;
        setDoctorsList(filterData);
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed");
      }
    };
    console.log(data.language_title, "data.language_title Mukeshhhhhhhhh");
    return (
      <label className="inline-flex items-center mt-3" key={data.id}>
        <input
          type="checkbox"
          className={`form-checkbox h-3 w-3 text-gray-600 ${
            isChecked ? "checked" : ""
          }`}
          onChange={handleChange}
          checked={
            isChecked ||
            (commonParams.specialityParams &&
              commonParams.specialityParams?.includes(
                data?.medical_speciality_name
              )) ||
            commonParams.speciality?.includes(data?.medical_speciality_name) ||
            commonParams.conditionParams?.includes(
              data?.medical_condition_name
            ) ||
            commonParams.conditions?.includes(data?.medical_condition_name) ||
            commonParams.insuranceParams?.includes(
              data?.insurance_company_name
            ) ||
            commonParams.insurance?.includes(data?.insurance_company_name) ||
            commonParams.appointment_type === data ||
            commonParams.language?.includes(data?.language_title)
          }
        />
        <span className="ml-2 text-gray-700 text-[.8rem] 2xl:text-[1rem] font-sansSemibold ">
          {data.language_title ||
            data.medical_speciality_name ||
            data.medical_condition_name ||
            data.insurance_company_name ||
            data}
        </span>
      </label>
    );
  };

  //Mobile FIlter For InPerson and Virtual
  const [startDate] = useState(new Date());
  const [activeMobileAppointMentType, setActiveMobileAppointMentType] =
    useState({
      InPerson: false,
      Virtual: false,
    });

  const filterInPersonHandler = () => {
    const newInPersonState = !activeMobileAppointMentType.InPerson;
    setActiveMobileAppointMentType((prevState) => ({
      ...prevState,
      InPerson: newInPersonState,
    }));

    let url = `/doctor-listing?date=${moment(startDate).format("YYYY-MM-DD")}`;
    if (newInPersonState && activeMobileAppointMentType.Virtual) {
      url += "";
      navigate(url);
      return;
    }
    if (newInPersonState) {
      url += "&appointment_type=InPerson";
    } else if (activeMobileAppointMentType.Virtual) {
      url += "&appointment_type=Virtual";
    } else {
      url += "";
    }

    navigate(url);
  };

  const filterVirtualHandler = () => {
    const newVirtualState = !activeMobileAppointMentType.Virtual;
    setActiveMobileAppointMentType((prevState) => ({
      ...prevState,
      Virtual: newVirtualState,
    }));

    let url = `/doctor-listing?date=${moment(startDate).format("YYYY-MM-DD")}`;
    if (newVirtualState && activeMobileAppointMentType.InPerson) {
      url += "";
      navigate(url);
      return;
    }
    if (newVirtualState) {
      url += "&appointment_type=Virtual";
    } else if (activeMobileAppointMentType.InPerson) {
      url += "&appointment_type=InPerson";
    } else {
      url += "";
    }

    navigate(url);
  };

  if (status === "failed" || !doctorsList) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-sansBold text-[1.3rem] text-[#292F33] tracking-[2px]">
          Failed to fetch doctors data.
        </h2>
      </div>
    );
  }

  return (
    <>
      <section className="px-[.3rem] max-w-[1580px] mx-auto">
        <div className="md:hidden mt-5 px-2 flex">
          <input
            type="text"
            onChange={handleMobileDoctorSearch}
            value={filterDoctorSearchTerm}
            className="w-full h-[40px] border-2 rounded border-r-0 border-gray-300 px-5 outline-none"
          />
          <img
            src={searchIcon}
            alt="search"
            className="h-auto w-[40px]  float-right bg-verifiCation cursor-pointer rounded-r-md justify-end"
          />
        </div>
        <div className="md:hidden flex items-center mt-5 px-2 space-x-2">
          <div
            className={`w-full rounded-2xl border border-verifiCation  text-gray-900 flex items-center justify-center h-7  tracking-[1px] ${
              activeMobileAppointMentType.InPerson
                ? "bg-verifiCation text-white"
                : ""
            }`}
            onClick={filterInPersonHandler}
          >
            In Person
          </div>
          <div
            className={`w-full rounded-2xl border border-verifiCation text-gray-900 flex items-center justify-center h-7  tracking-[1px] ${
              activeMobileAppointMentType.Virtual
                ? "bg-verifiCation text-white"
                : ""
            } `}
            onClick={filterVirtualHandler}
          >
            Virtual
          </div>
          <div
            className="w-full rounded-2xl border border-gray-500 text-gray-900 flex items-center justify-center h-7  tracking-[1px] "
            onClick={toggleFilterMenuHandler}
          >
            Filters
          </div>
          {isMenuForFilter && (
            <div
              className={`fixed overflow-y-auto overflow-x-hidden top-0 right-0 w-screen h-screen bg-white z-10 transform transition-transform duration-300 ease-in-out ${
                isMenuForFilter ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="relative">
                <button
                  onClick={toggleFilterMenuHandler}
                  className="absolute top-5 right-5 h-10 w-10 bg-gray-200 flex justify-center items-center rounded-full rounded-full"
                >
                  <img src={cross} className=" h-4" />
                </button>
                <div className="absolute top-20 left-10 w-full">
                  <aside className="flex flex-col  px-6 py-3">
                    <h2 className="font-sansBold text-[1rem] text-[#292F33] 2xl:text-[1.3rem]">
                      {filterData && "Filters"}
                    </h2>
                    {filterData === null ? (
                      <></>
                    ) : (
                      <>
                        {filterData &&
                          filterData?.data?.result?.map((item, index) => {
                            return (
                              <div
                                className="mt-5 cursor-pointer w-[240px]"
                                key={item.id}
                                id={item.title}
                              >
                                <h2 className="font-sansBold text-[.8rem] 2xl:text-[1.1rem] text-[#292F33] mb-3">
                                  {item.title}
                                </h2>
                                <div className="">
                                  <div className="flex flex-col">
                                    {generateLabels(item)}
                                  </div>
                                  {item.title !== "Appointment Type" &&
                                    item.value.length > 3 && (
                                      <label
                                        onClick={() => openViewAll(item.title)}
                                        id={item.title}
                                        className="inline-flex items-center mt-3 text-[#CF8B15] underline cursor-pointer"
                                      >
                                        View all
                                      </label>
                                    )}
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </aside>
                  <div className="flex mb-10 mt-5">
                    <button
                      className="bg-white text-verifiCation border border-verifiCation px-12 py-2 rounded-full"
                      onClick={toggleFilterMenuHandler}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-verifiCation text-white px-12 py-2 rounded-full ml-5"
                      onClick={toggleFilterMenuHandler}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <h2 className="px-2 md:px-5 font-sansBold text-[1rem] md:text-[1.3rem] mt-8 text-[#292F33] tracking-[1px]">
          {doctorsList.length > 0 || filterDoctorList.length > 0
            ? `We have found ${
                filterDoctorList.length > 0
                  ? filterDoctorList.length
                  : totalCount
              } Doctors for your search criteria`
            : ""}
        </h2>

        <hr className="md:hidden mt-5 border-[#E4E4E4] border-[1px] mx-[5px] " />
        <div className="flex mt-5">
          <aside
            className={`hidden md:flex flex-col  px-6 py-3 ${
              filterData ? "border-r border-gray-300" : ""
            } `}
          >
            <h2 className="font-sansBold text-[1rem] text-[#292F33] 2xl:text-[1.3rem]">
              {filterData && "Filters"}
            </h2>
            {filterData === null ? (
              <></>
            ) : (
              <>
                {filterData &&
                  filterData?.data?.result?.map((item, index) => {
                    return (
                      <div
                        className="mt-5 cursor-pointer w-[240px]"
                        key={item.id}
                        id={item.title}
                      >
                        <h2 className="font-sansBold text-[.8rem] 2xl:text-[1.1rem] text-[#292F33] mb-3">
                          {item.title}
                        </h2>
                        <div className="">
                          <div className="flex flex-col">
                            {generateLabels(item)}
                          </div>
                          {item.title !== "Appointment Type" &&
                            item.value.length > 3 && (
                              <label
                                onClick={() => openViewAll(item.title)}
                                id={item.title}
                                className="inline-flex items-center mt-3 text-[#CF8B15] underline cursor-pointer"
                              >
                                View all
                              </label>
                            )}
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </aside>
          <main className=" ml-0 mb-5 md:ml-5">
            {renderDoctorsList()}
            {status === "loading"
              ? ""
              : doctorsList.length === 0 && (
                  <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={noDoctor}
                        alt="no doctors"
                        className="w-[25%] h-auto object-contain"
                      />
                      <h2 className="font-sansBold text-center ml-16 py-4 text-[1.3rem] text-[#8b9093] tracking-[2px]">
                        No doctors found.
                      </h2>
                    </div>
                  </div>
                )}

            <div className="mt-10">
              <Pagination
                onPageChange={handlePageChange}
                totalCount={totalCount}
                pageSize={pageSize}
                siblingCount={siblingCount}
                currentPage={currentPage}
              />
            </div>
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DoctorListing;
