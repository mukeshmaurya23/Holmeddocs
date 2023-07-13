// import React, { useState, useEffect } from "react";

// import Pagination from "./Pagination";
// import { usePagination } from "../../../hooks/usePagination";
// import useFetch from "../../../hooks/useFetch";
// import { useDispatch, useSelector } from "react-redux";
// import loadingGif from "../../../images/icons/Loader.gif";
// import { fetchData } from "../../../store/apiSlice";
// import DoctorsList from "./DoctorsList";
// import Footer from "../../../UI/Footer";
// import filterApiSlice from "../../../store/filterApiSlice";
// import customAxios from "../../../axios/custom";

// const DoctorListing = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   //const dispatch = useDispatch();
//   //const { data: filterData, error, status } = useSelector((state) => state.api);
//   const { data: filterData } = useFetch("/patient/filters");

//   console.log(filterData, "filterData");
//   const [viewAll, setViewAll] = useState(false);

//   const toggleViewAll = () => {
//     console.log("toggleViewAll");
//     setViewAll(!viewAll);
//   };
//   const dispatch = useDispatch();
//   const filterDispatch = useDispatch();
//   const { data: doctorsList, status } = useSelector((state) => state.api);

//   console.log(doctorsList, "doctorsList from listing");

//   useEffect(() => {
//     dispatch(fetchData("/patient/doctors"));
//   }, [dispatch]);

//   //const filterDataList = useSelector((state) => state.filterapi);
//   // const { data: filterDataList, status: filterStatus } = useSelector(
//   //   (state) => state.filterapi
//   // );

//   // useEffect(() => {
//   //   filterDispatch(
//   //     filterApiSlice("/patient/doctors", {
//   //       language: "1",
//   //     })
//   //   );
//   // }, [filterDispatch]);

//   // console.log(filterDataList, "filterDataList");
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   console.log(filterData?.data?.result, "filterData");

//   const totalCount = doctorsList?.data?.result?.length;
//   const pageSize = 4;
//   const siblingCount = 1;

//   const paginationRange = usePagination({
//     totalCount,
//     pageSize,
//     siblingCount,
//     currentPage,
//   });
//   console.log(paginationRange, "paginationRange");
//   const renderDoctorsList = () => {
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;

//     if (doctorsList?.data?.result.length > 0) {
//       const paginatedData = doctorsList?.data?.result?.slice(
//         startIndex,
//         endIndex
//       );
//       return (
//         <>
//           <DoctorsList doctorsList={paginatedData} status={status} />;
//         </>
//       );
//     }
//     return null;
//   };

//   const generateLabel = (data) => {
//     const handleChnage = async (e) => {
//       console.log(e.target.checked, "e.target.checked");
//       if (e.target.checked) {
//         try {
//           const filterResponse = await customAxios.post("/patient/doctors", {
//             language: `${data.id}`,
//           });
//           const filterData = await filterResponse?.data?.data?.result;
//           console.log(filterData, "filterData");
//           dispatch(fetchData("/patient/doctors", filterData));
//         } catch (error) {
//           console.log(error.message);
//         }
//       } else {
//         console.log("unchecked");
//       }
//     };
//     return (
//       <label className="inline-flex items-center mt-3" key={data.id || data}>
//         <input
//           type="checkbox"
//           className="form-checkbox h-3 w-3 text-gray-600"
//           onChange={handleChnage}
//         />
//         <span className="ml-2 text-gray-700 text-[.8rem] tracking-[2px] font-sansRegular">
//           {data.language_title ||
//             data.medical_speciality_name ||
//             data.medical_condition_name ||
//             data.insurance_company_name ||
//             data}
//         </span>
//       </label>
//     );
//   };
//   const generateLabels = (category) => {
//     console.log(category.value, "category bbnbnbnb");
//     const values = category.value;
//     let displayedValues = values;

//     if (category.title === "Language" && !viewAll) {
//       displayedValues = values.slice(0, 3);
//     } else if (category.title === "Insurance" && !viewAll) {
//       displayedValues = values.slice(0, 4);
//     } else if (category.title === "Conditions" && !viewAll) {
//       displayedValues = values.slice(0, 6);
//     } else if (category.title === "Specialty" && !viewAll) {
//       displayedValues = values.slice(0, 6);
//     }

//     return displayedValues.map((data) => generateLabel(data));
//   };
//   return (
//     <>
//       <section className=" ">
//         <h2 className="px-10  font-sansBold text-[1.3rem] mt-5 text-[#292F33] tracking-[2px]">
//           We have found {totalCount} Doctors for your search criteria.
//         </h2>
//         <div className="flex mt-10 mb-10">
//           <aside className="flex flex-col px-10 py-3  border-r">
//             <h2 className="font-sansBold text-[1rem] text-[#292F33] tracking-[2px]">
//               Filters
//             </h2>
//             {filterData === null ? (
//               <>
//                 <h2>Loading ...</h2>
//               </>
//             ) : (
//               <>
//                 {filterData?.data?.result.map((item, index) => {
//                   console.log(item.value, "item value");
//                   return (
//                     <div className="mt-5 cursor-pointer" key={item.id}>
//                       <h2 className="font-sansBold text-[.8rem] text-[#292F33] tracking-[2px] mb-3">
//                         {item.title}
//                       </h2>

//                       <div className="">
//                         <div className="flex flex-col">
//                           {generateLabels(item)}
//                         </div>
//                         {item.title !== "Appointment Type" &&
//                           item.value.length > 3 && (
//                             <label
//                               onClick={toggleViewAll}
//                               className="inline-flex items-center mt-3 text-[#CF8B15] underline cursor-pointer"
//                             >
//                               View all
//                             </label>
//                           )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </>
//             )}
//           </aside>
//           <main className="ml-10 ">
//             {/* Render your content based on the current page */}
//             {status === "loading" ? (
//               <div className="flex justify-center items-center h-screen">
//                 <img src={loadingGif} alt="" />
//               </div>
//             ) : (
//               <>{renderDoctorsList()}</>
//             )}
//             {/* {totalCount > 0 ? (
//               renderDoctorsList()
//             ) : (
//               <div className="flex justify-center items-center h-screen">
//                 <h2 className="font-sansBold text-[1.3rem] text-[#292F33] tracking-[2px]">
//                   No Doctors Found
//                 </h2>
//               </div>
//             )} */}
//             <div className="mt-10">
//               <Pagination
//                 onPageChange={handlePageChange}
//                 totalCount={totalCount}
//                 pageSize={pageSize}
//                 siblingCount={siblingCount}
//                 currentPage={currentPage}
//               />
//             </div>
//           </main>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default DoctorListing;

import React, { useState, useEffect } from "react";

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
      condition: [],
    },
    {
      appointment_type: "",
    },
    //appointment_type ://pending
  ]);

  const [time_slot_day, setTime_slot_day] = useState("");
  const [day, setDay] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get("date");

    if (dateParam) {
      const dateObject = new Date(dateParam);
      const dayOfWeek = dateObject.toLocaleDateString("en-US", {
        weekday: "long",
      });

      setTime_slot_day(dayOfWeek);
      fetchDoctorsData(dayOfWeek);
    }
  }, []);
  console.log(
    time_slot_day,
    "time_slot_day hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
  );

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { data: filterData } = useFetch("/patient/filters");

  const [viewAll, setViewAll] = useState(null);

  const openViewAll = (name) => {
    if (viewAll === name) {
      setViewAll(null); // Collapse the currently expanded category
    } else {
      setViewAll(name); // Expand the clicked category
    }
  };

  // useEffect(() => {
  //   fetchDoctorsData();
  // }, []);

  // const fetchDoctorsData = async () => {
  //   setStatus("loading");
  //   try {
  //     const response = await customAxios.post("/patient/doctors", {
  //       time_slot_day: time_slot_day,
  //     });
  //     const data = response?.data?.data?.result;
  //     setDoctorsList(data);
  //     setStatus("succeeded");
  //   } catch (error) {
  //     console.log(error.message);
  //     setStatus("failed");
  //   }
  // };
  const fetchDoctorsData = async (day) => {
    setDay(day);
    setStatus("loading");
    try {
      const response = await customAxios.post("/patient/doctors", {
        time_slot_day: day,
      });
      const data = response?.data?.data?.result;
      setDoctorsList(data);
      setStatus("succeeded");
    } catch (error) {
      console.log(error.message);
      setStatus("failed");
    }
  };
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
    console.log(values, "values from Generate Labels");
    let displayedValues = values;

    if (category.title === "Language" && viewAll !== category.title) {
      displayedValues = values.slice(0, 3);
    } else if (category.title === "Insurance" && viewAll !== category.title) {
      displayedValues = values.slice(0, 4);
    } else if (category.title === "Conditions" && viewAll !== category.title) {
      displayedValues = values.slice(0, 6);
    } else if (category.title === "Specialty" && viewAll !== category.title) {
      displayedValues = values.slice(0, 6);
    }

    return displayedValues.map((data) => generateLabel(data, category));
  };

  console.log(
    checkedIds,
    "checkedIds from loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"
  );
  const generateLabel = (data, category) => {
    // const handleChange = async (e) => {
    //   const checked = e.target.checked;
    //   const id = data.id;
    //   const appointment_type = data;

    //   if (checked) {
    //     setCheckedIds((prevCheckedIds) => [...prevCheckedIds, id]);
    //   } else {
    //     setCheckedIds((prevCheckedIds) =>
    //       prevCheckedIds.filter((checkedId) => checkedId !== id)
    //     );
    //   }
    //   let filterTitle = category.title.toLowerCase().replace(" ", "_");
    //   filterTitle = filterTitle.replace("specialty", "speciality");
    //   filterTitle = filterTitle.replace("appointment type", "appointment_type");

    //   //get the date from the url and set it to the state
    //   const date = searchParams.get("date");
    //   setTime_slot_day(date);
    //   console.log(date, "date from the url");
    //   // let filterTitle = category.title.toLowerCase().replace(" ", "_");
    //   // filterTitle = category.title
    //   //   .toLowerCase()
    //   //   .replace("specialty", "speciality");
    //   // filterTitle = category.title
    //   //   .toLowerCase()
    //   //   .replace("appointment type", "appointment_type");
    //   const requestBody = {
    //     ...searchParams,
    //     [filterTitle]: checked
    //       ? filterTitle.toLowerCase() === "appointment_type"
    //         ? appointment_type
    //         : [...checkedIds, id]
    //       : checkedIds.filter((checkedId) => checkedId !== id),
    //     time_slot_day: day,
    //   };
    //   searchParams.set(
    //     filterTitle,
    //     checked
    //       ? filterTitle.toLowerCase() === "appointment_type"
    //         ? appointment_type
    //         : [...checkedIds, id]
    //       : checkedIds.filter((checkedId) => checkedId !== id)
    //   );
    //   navigate(`?${searchParams.toString()}`);

    //   //if unchecked remove from search params
    //   if (!checked) {
    //     const params = new URLSearchParams(location.search);
    //     params.delete(filterTitle);
    //     navigate(`?${params.toString()}`);
    //   }
    //   try {
    //     setStatus("loading");
    //     const filterResponse = await customAxios.post(
    //       "/patient/doctors",
    //       requestBody
    //     );
    //     const filterData = filterResponse?.data?.data?.result;
    //     setDoctorsList(filterData);
    //     setStatus("succeeded");
    //   } catch (error) {
    //     console.log(error.message);
    //     setStatus("failed");
    //   }
    // };
    const handleChange = async (e) => {
      const checked = e.target.checked;
      const id = data.id;
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

        // Update the filter category with the new checkedIds value
        filterCategory[filterCategoryKey] = checked
          ? [...filterCategory[filterCategoryKey], id]
          : filterCategory[filterCategoryKey].filter(
              (checkedId) => checkedId !== id
            );
      }

      // Update the reqBodyFilterData state with the updated newReqBodyFilterData
      setReqBodyFilterData(newReqBodyFilterData);

      // Construct the requestBody object by merging all the filter categories
      const requestBody = newReqBodyFilterData.reduce(
        (acc, cur) => ({ ...acc, ...cur }),
        { time_slot_day: day }
      );

      // Update the searchParams and navigate based on the updated filter data
      searchParams.set(
        filterTitle,
        checked
          ? filterTitle.toLowerCase() === "appointment_type"
            ? appointment_type
            : [...checkedIds, id]
          : checkedIds.filter((checkedId) => checkedId !== id)
      );
      navigate(`?${searchParams.toString()}`);

      // If unchecked, remove the filterTitle from the searchParams
      if (!checked) {
        searchParams.delete(filterTitle);
        navigate(`?${searchParams.toString()}`);
      }

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
        console.log(error.message);
        setStatus("failed");
      }
    };
    return (
      <label className="inline-flex items-center mt-3" key={data.id || data}>
        <input
          type="checkbox"
          className="form-checkbox h-3 w-3 text-gray-600"
          onChange={handleChange}
        />
        <span className="ml-2 text-gray-700 text-[.8rem] tracking-[2px] font-sansRegular">
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
      <section>
        <h2 className="px-10 font-sansBold text-[1.3rem] mt-5 text-[#292F33] tracking-[2px]">
          We have found {totalCount} Doctors for your search criteria.
        </h2>

        <div className="flex mt-10 mb-10">
          <aside className="flex flex-col px-10 py-3 border-r">
            <h2 className="font-sansBold text-[1rem] text-[#292F33] tracking-[2px]">
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
                      className="mt-5 cursor-pointer max-w-[300px]"
                      key={item.id}
                      id={item.title}
                    >
                      <h2 className="font-sansBold text-[.8rem] text-[#292F33] tracking-[2px] mb-3">
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
          <main className="ml-10">
            {renderDoctorsList()}
            {status === "loading"
              ? ""
              : doctorsList.length === 0 && (
                  <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={noDoctor}
                        alt="no doctors"
                        className="w-[25%] h-auto object-contain"
                      />
                      <h2 className="font-sansBold text-center px-16 text-[1.3rem] text-[#292F33] tracking-[2px]">
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
