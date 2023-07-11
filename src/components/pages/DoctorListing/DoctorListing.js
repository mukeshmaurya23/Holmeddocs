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
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsList, setDoctorsList] = useState([]);
  const [status, setStatus] = useState("idle");

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

  useEffect(() => {
    fetchDoctorsData();
  }, []);

  const fetchDoctorsData = async () => {
    setStatus("loading");
    try {
      const response = await customAxios.get("/patient/doctors");
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
  const generateLabel = (data, category) => {
    // console.log(category.title, "category from label and title");
    let checkArr = [];
    const handleChnage = async (e) => {
      console.log(e.target.checked, "e.target.checked");

      if (e.target.checked) {
        checkArr.push(data.id);
        console.log(checkArr, "checkArr");
        console.log(data.id, "data.id");
        setStatus("loading");
        //get the params from the url and add the new param
        // const params = new URLSearchParams(searchParams);
        // params.append(category.title.toLowerCase(), `${data.id}`);
        // setSearchParams(params);
        // checkData[
        //   category.title.toLowerCase() === "specialty"
        //     ? "speciality"
        //     : category.title.toLowerCase() === "appointment type"
        //     ? "appointment_type"
        //     : category.title.toLowerCase()
        // ].push(
        //   category.title.toLowerCase() === "appointment type"
        //     ? `${data}`
        //     : `${data.id}`
        // );
        const reqBody = {
          [category.title.toLowerCase() === "specialty"
            ? "speciality"
            : category.title.toLowerCase() === "appointment type"
            ? "appointment_type"
            : category.title.toLowerCase()]:
            category.title.toLowerCase() === "appointment type"
              ? `${data}`
              : `${data.id}`,

          // [category.title.toLowerCase() === "appointment type"
          // ? "appointment_type"
          // : category.title.toLowerCase()]: `${data}`,
          // [category.title.toLowerCase()]: `${data.id}`,
        };
        // console.log(checkData, "Bhai kaam kar jaa");
        // console.log(reqBody, "reqBody");
        searchParams.set(
          category.title.toLowerCase(),
          category.title.toLowerCase() === "appointment type"
            ? `${data}`
            : `${data.id}`
        );
        navigate(`?${searchParams.toString()}`);
        try {
          const filterResponse = await customAxios.post("/patient/doctors", {
            language: ["5", "2"],
          });
          // const filterResponse = await customAxios.post(
          //   "/patient/doctors",
          //   reqBody
          // );
          const filterData = filterResponse?.data?.data?.result;
          console.log(filterData, "filterData");
          setDoctorsList(filterData);
          setStatus("succeeded");
        } catch (error) {
          console.log(error.message);
          setStatus("failed");
        }
      } else {
        //remove the param from the url

        const params = new URLSearchParams(searchParams);
        params.delete(category.title.toLowerCase());
        navigate(`?${params.toString()}`);

        // fetchDoctorsData();
      }
    };
    console.log(data, "data meeeee");
    return (
      <label className="inline-flex items-center mt-3" key={data.id || data}>
        <input
          type="checkbox"
          className="form-checkbox h-3 w-3 text-gray-600"
          onChange={handleChnage}
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
            {doctorsList.length === 0 && (
              <div className="flex justify-center flex-row, items-center">
                <div className="flex flex-col flex-1 justify-center items-center">
                  <img
                    src={noDoctor}
                    alt="no doctors"
                    className="w-[400px] h-[400px] object-contain"
                  />
                  <h2 className="font-sansBold text-[1.3rem] text-[#292F33] tracking-[2px]">
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
