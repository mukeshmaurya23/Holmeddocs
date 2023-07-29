import React, { useState, useEffect, useRef } from "react";

import Pagination from "./Pagination";

import useFetch from "../../../hooks/useFetch";

import loadingGif from "../../../images/icons/Loader.gif";

import DoctorsList from "./DoctorsList";
import Footer from "../../../UI/Footer";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import customAxios from "../../../axios/custom";
import noDoctor from "../../../images/zerodoctor.png";
const DoctorListing = () => {
  const [checkedIds, setCheckedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsList, setDoctorsList] = useState([]);
  const [status, setStatus] = useState("idle");

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
  const { data: filterData } = useFetch("/patient/filters");
  const [shouldCallAPI, setShouldCallAPI] = useState(true);
  const [time_slot_day, setTime_slot_day] = useState("");
  const [day, setDay] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const commonParams = {
    date: searchParams.get("date"),
    locationParams: searchParams.get("location"),
    specialityParams: searchParams.get("speciality"),
    conditionParams: searchParams.get("conditions"),
    insuranceParams: searchParams.get("insurance"),
  };

  const zipCode = commonParams?.locationParams?.split("_")[1];
  const specialityId = commonParams?.specialityParams?.split("_")[1];
  const conditionId = commonParams?.conditionParams?.split("_")[1];

  const [viewAll, setViewAll] = useState(null);

  const openViewAll = (name) => {
    if (viewAll === name) {
      setViewAll(null);
    } else {
      setViewAll(name);
    }
  };

  const fetchDoctorsData = async (day) => {
    setDay(day);
    setStatus("loading");

    try {
      const response = await customAxios.post("/patient/doctors", {
        time_slot_day: day,
        serving_areas: zipCode,
        speciality: specialityId,
        conditions: conditionId,
      });

      const data = response?.data?.data?.result;
      setDoctorsList(data);
      setStatus("succeeded");
    } catch (error) {
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (shouldCallAPI) {
      const urlParams = new URLSearchParams(window.location.search);
      const dateParam = urlParams.get("date");
      if (dateParam) {
        const dateObject = new Date(dateParam);
        const dayOfWeek = dateObject.toLocaleDateString("en-US", {
          weekday: "long",
        });
        setTime_slot_day(dayOfWeek);
        fetchDoctorsData(dayOfWeek);
        setShouldCallAPI(true);
      }
    }
  }, [
    commonParams?.locationParams,
    commonParams?.specialityParams,
    commonParams?.conditionParams,
    commonParams?.date,
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
        <div className="flex justify-center items-center h-screen">
          <img src={loadingGif} alt="" />
        </div>
      );
    }
    if (doctorsList?.length > 0) {
      const paginatedData = doctorsList?.slice(startIndex, endIndex);
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

    return displayedValues.map((data) => generateLabel(data, category));
  };

  const generateLabel = (data, category) => {
    const isChecked =
      commonParams.specialityParams?.includes(data?.medical_speciality_name) ||
      commonParams.conditionParams?.includes(data?.medical_condition_name) ||
      commonParams.insuranceParams?.includes(data?.insurance_company_name);

    const handleChange = async (e) => {
      const checked = e.target.checked;
      setShouldCallAPI(false);
      const id = data.id;
      const name =
        data.medical_speciality_name ||
        data.medical_condition_name ||
        data.insurance_company_name;

      const appointment_type = data;

      if (checked) {
        setCheckedIds((prevCheckedIds) => [...prevCheckedIds, id]);
      } else {
        setCheckedIds((prevCheckedIds) =>
          prevCheckedIds.filter((checkedId) => checkedId !== id)
        );
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
        console.log(filterCategoryKey, "filterCategoryKey")

        if (filterCategoryKey === "appointment_type") {
          
          filterCategory[filterCategoryKey] = checked ? appointment_type : null;
         
        }else{
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
        const valueToAdd =
          filterTitle.toLowerCase() === "appointment_type"
            ? appointment_type
            : name
            ? `${name}_${id}`
            : id;

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

    return (
      <label className="inline-flex items-center mt-3" key={data.id || data}>
        <input
          type="checkbox"
          className={`form-checkbox h-3 w-3 text-gray-600 ${
            isChecked ? "checked" : ""
          }`}
          onChange={handleChange}
          checked={isChecked}
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
      <section className="px-[.3rem] max-w-[1560px] mx-auto">
        <h2 className="px-10 font-sansBold text-[1.3rem] mt-5 text-[#292F33] tracking-[1px]">
          We have found {totalCount} Doctors for your search criteria.
        </h2>

        <div className="flex mt-16">
          <aside className="flex flex-col  px-10 py-3 border-r border-gray-300">
            <h2 className="font-sansBold text-[1rem] text-[#292F33] 2xl:text-[1.3rem]">
              Filters
            </h2>
            {filterData === null ? (
              <>
                <h2>Loading ...</h2>
              </>
            ) : (
              <>
                {filterData?.data?.result.map((item, index) => {
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
          <main className="ml-5">
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
