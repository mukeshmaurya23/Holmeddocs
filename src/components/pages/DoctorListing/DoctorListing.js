import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../util/Button";
import { dummyData } from "../../../constant";
import Pagination from "./Pagination";
import { usePagination } from "../../../hooks/usePagination";

const DoctorListing = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // You can perform any other actions here, such as fetching data for the new page.
  };

  // Dummy data
  const totalCount = 1000;
  const pageSize = 10;
  const siblingCount = 1;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });
  return (
    <>
      <section className=" ">
        <h2 className="px-10  font-sansBold text-[1.3rem] mt-5 text-[#292F33] tracking-[2px]">
          We have found 75 Doctors for your search criteria.
        </h2>
        <div className="flex mt-10 mb-10">
          <aside className="flex flex-col px-10 py-3  border-r">
            <h2 className="font-sansBold text-[1rem] text-[#292F33] tracking-[2px]">
              Filters
            </h2>
            {dummyData.map((item, index) => (
              <div className="mt-5 cursor-pointer" key={item.id}>
                <h2 className="font-sansBold text-[.8rem] text-[#292F33] tracking-[2px] mb-3">
                  {item.title}
                </h2>
                <div className="flex flex-col">
                  {item.data.map((data, index) => (
                    <label
                      className="inline-flex items-center mt-3"
                      key={data.id}
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-3 w-3 text-gray-600"
                      />
                      <span className="ml-2 text-gray-700 text-[.8rem] tracking-[2px] font-sansRegular">
                        {data.name}
                      </span>
                    </label>
                  ))}

                  <label className="inline-flex items-center mt-3 text-[#CF8B15] underline cursor-pointer">
                    View all
                  </label>
                </div>
              </div>
            ))}
          </aside>
          <main className="ml-10 ">
            <div className="flex justify-center items-center">
              <Pagination
                onPageChange={handlePageChange}
                totalCount={totalCount}
                pageSize={pageSize}
                siblingCount={siblingCount}
                currentPage={currentPage}
              />
              {/* Render your content based on the current page */}
              {paginationRange.map((pageNumber) => (
                <div key={pageNumber}>{/* Render content for each page */}</div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default DoctorListing;
