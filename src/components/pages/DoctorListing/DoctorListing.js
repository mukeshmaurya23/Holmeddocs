import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../util/Button";
import { dummyData } from "../../../constant";
import Pagination from "./Pagination";
import { usePagination } from "../../../hooks/usePagination";
import useFetch from "../../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import loadingGif from "../../../images/icons/Loader.gif";
import { fetchData } from "../../../store/apiSlice";
import DoctorsList from "./DoctorsList";
const DoctorListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);

  //const dispatch = useDispatch();
  //const { data: filterData, error, status } = useSelector((state) => state.api);
  const { data: filterData } = useFetch("/patient/filters");

  // useEffect(() => {
  //   dispatch(fetchData("/patient/filters"));
  // }, []);

  console.log(filterData, "filterData");
  const [viewAll, setViewAll] = useState(false);

  const toggleViewAll = () => {
    console.log("toggleViewAll");
    setViewAll(!viewAll);
  };
  const dispatch = useDispatch();
  const { data: doctorsList, status } = useSelector((state) => state.api);

  console.log(doctorsList, "doctorsList from listing");

  useEffect(() => {
    dispatch(fetchData("/patient/doctors"));
  }, [dispatch]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(filterData?.data?.result, "filterData");

  const totalCount = doctorsList?.data?.result?.length;
  const pageSize = 4;
  const siblingCount = 1;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });
  console.log(paginationRange, "paginationRange");
  const renderDoctorsList = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (status === "loading") {
      return <img src={loadingGif} alt="loading" />;
    }

    if (doctorsList?.data?.result) {
      const paginatedData = doctorsList?.data?.result?.slice(
        startIndex,
        endIndex
      );
      return doctorsList?.data?.result?.length > 0 ? (
        <>
          <DoctorsList doctorsList={paginatedData} status={status} />
        </>
      ) : (
        <h1>No doctors found</h1>
      );
    }
    return <h1>No doctors found</h1>;
  };

  const generateLabel = (data) => (
    <label className="inline-flex items-center mt-3" key={data.id || data}>
      <input type="checkbox" className="form-checkbox h-3 w-3 text-gray-600" />
      <span className="ml-2 text-gray-700 text-[.8rem] tracking-[2px] font-sansRegular">
        {data.language_title ||
          data.medical_speciality_name ||
          data.medical_condition_name ||
          data.insurance_company_name ||
          data}
      </span>
    </label>
  );
  const generateLabels = (category) => {
    console.log(category.value, "category bbnbnbnb");
    const values = category.value;
    let displayedValues = values;

    if (category.title === "Language" && !viewAll) {
      displayedValues = values.slice(0, 3);
    } else if (category.title === "Insurance" && !viewAll) {
      displayedValues = values.slice(0, 4);
    } else if (category.title === "Conditions" && !viewAll) {
      displayedValues = values.slice(0, 6);
    } else if (category.title === "Specialty" && !viewAll) {
      displayedValues = values.slice(0, 6);
    }

    return displayedValues.map((data) => generateLabel(data));
  };
  return (
    <>
      <section className=" ">
        <h2 className="px-10  font-sansBold text-[1.3rem] mt-5 text-[#292F33] tracking-[2px]">
          We have found {totalCount} Doctors for your search criteria.
        </h2>
        <div className="flex mt-10 mb-10">
          <aside className="flex flex-col px-10 py-3  border-r">
            <h2 className="font-sansBold text-[1rem] text-[#292F33] tracking-[2px]">
              Filters
            </h2>
            {filterData === null ? (
              <>
                <div className="flex justify-start ">
                  <img src={loadingGif} alt="" />
                </div>
              </>
            ) : (
              <>
                {filterData?.data?.result.map((item, index) => {
                  console.log(item.value, "item value");
                  return (
                    <div className="mt-5 cursor-pointer" key={item.id}>
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
                              onClick={toggleViewAll}
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
          <main className="ml-10 ">
            {/* Render your content based on the current page */}

            {renderDoctorsList()}
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
    </>
  );
};

export default DoctorListing;
