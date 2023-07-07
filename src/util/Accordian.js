// import React, { useState, useEffect, useRef } from "react";
// import { getAllMedicalConditionList } from "../services/services";
// const Accordion = ({ items, items2, items3, showBorder, image, className }) => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [medicalConditionListData, setMedicalConditionListData] =
//     useState(null);
//   console.log(items3, "im items from Accordion");
//   console.log(items2, "im items2 from Accordion");
//   const handleItemClick = (id) => {
//     setSelectedItem((prevSelectedItem) =>
//       prevSelectedItem === id ? null : id
//     );
//   };
//   const [selectedItemList, setSelectedItemList] = useState(null);
//   const handleSelectedItem = (name) => {
//     console.log(name, "im name from handleSelectedItem");
//     setSelectedItemList(name);
//   };

//   console.log(selectedItem, "im handleItemClick");
//   useEffect(() => {
//     try {
//       const getAllMedicalConditionListData = async () => {
//         const res = await getAllMedicalConditionList(selectedItem);

//         console.log(res, "im res from Accordion");
//         setMedicalConditionListData(res);
//       };
//       getAllMedicalConditionListData();
//     } catch (error) {
//       console.log(error.message);
//     } finally {
//     }
//   }, [selectedItem]);
//   const ref = useRef();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!ref?.current?.contains(event.target)) {
//         setSelectedItem(null);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [ref]);
//   return (
//     <div
//       ref={ref}
//       className="flex flex-col  md:flex-row   justify-evenly md:gap-10 sm:gap-4 xs:gap-2 xsm:gap-1"
//     >
//       {items && items.length === 0 ? (
//         <h2>Loading</h2>
//       ) : (
//         items.map((item) => (
//           <div
//             className={`${
//               showBorder ? "border-b-2 border-gray-400 pb-7" : ""
//             } flex relative items-center  `}
//             key={item.id}
//           >
//             <h2
//               className={`font-sansBold  text-[.8rem] md:text-[.9rem] tracking-[2px] ${
//                 showBorder ? "mt-3" : ""
//               } ${className} `}
//             >
//               {item.medical_condition_name || item.title || selectedItemList}
//             </h2>
//             {/**ml-auto */}
//             <div
//               className="ml-auto md:ml-5 xl:pl-[4rem]"
//               onClick={() => handleItemClick(item.id)}
//             >
//               <img
//                 src={image}
//                 alt=""
//                 className={`${
//                   selectedItem === item.id ? "rotate-180" : ""
//                 } cursor-pointer h-3 w-3`}
//               />
//             </div>

//             <div
//               className={`${
//                 !showBorder &&
//                 "border-l  border-none md:border-l lg:border-l border-gray-400 h-[50px] ml-10 mr-5"
//               }`}
//             ></div>
//             {selectedItem === item.id && (
//               <div
//                 className="absolute top-10 bg-white w-full p-5 rounded-lg max-h-[30vh] overflow-y-auto"
//                 style={{
//                   zIndex: 1,
//                 }}
//               >
//                 {medicalConditionListData &&
//                   medicalConditionListData?.map((data) => (
//                     <h1
//                       key={data.id}
//                       className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
//                     >
//                       {/* {data?.state_name} */}
//                       {data?.speciality_name}
//                     </h1>
//                   ))}
//                 {item.id === "location" && (
//                   <>
//                     {items2.length === 0 ? (
//                       <h1>Loading</h1>
//                     ) : (
//                       items2?.map((item) => (
//                         <h1
//                           key={item.id}
//                           onClick={() => handleSelectedItem(item.state_name)}
//                           className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
//                         >
//                           {item.state_name}
//                         </h1>
//                       ))
//                     )}
//                   </>
//                 )}

//                 {item.id === "speciality" && (
//                   <>
//                     {items3?.length === 0 ? (
//                       <h1>Loading</h1>
//                     ) : (
//                       items3?.map((item) => (
//                         <h1
//                           key={item.id}
//                           className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
//                         >
//                           {item.medical_speciality_name}
//                         </h1>
//                       ))
//                     )}
//                   </>
//                 )}
//                 {/* {items3 && (
//                   <>
//                     {items3.map((item) => (
//                       <h1
//                         key={item.id}
//                         className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
//                       >
//                         {item.medical_speciality_name}
//                       </h1>
//                     ))}
//                   </>
//                 )} */}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Accordion;

import React, { useState, useEffect, useRef, useMemo } from "react";
import { getAllMedicalConditionList } from "../services/services";
import useFetch from "../hooks/useFetch";

const Accordion = ({
  items,
  items2,
  items3,
  showBorder,
  image,
  className,
  specialityLoading,
  locLoading,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [medicalConditionListData, setMedicalConditionListData] =
    useState(null);

  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
  });
  const [loader, setLoader] = useState(false);
  const { loading } = useFetch("/patient/master/state");
  console.log(loading, "loading");
  const handleItemClick = (id) => {
    console.log(id, "id");
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === id ? null : id
    );
  };

  const handleSelectedItem = (name, type) => {
    // setSelectedItemList(name);
    setSelectedItemList((prevSelectedItemList) => {
      return { ...prevSelectedItemList, [type]: name };
    });
  };
  console.log(selectedItemList, "selectedItemList");

  useEffect(() => {
    const getAllMedicalConditionListData = async () => {
      try {
        setLoader(true);
        const res = await getAllMedicalConditionList(selectedItem);
        setMedicalConditionListData(res);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoader(false);
      }
    };

    getAllMedicalConditionListData();
  }, [selectedItem]);

  const ref = useRef();

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

  const memoizedMedicalConditionListData = useMemo(
    () => medicalConditionListData,
    [medicalConditionListData]
  );

  const locationItems = () => {
    return items2.map((item) => (
      <h1
        key={item.id}
        onClick={() => handleSelectedItem(item.state_name, "location")}
        className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
      >
        {item.state_name}
      </h1>
    ));
  };

  const specialityItems = () => {
    return items3?.map((item) => (
      <h1
        key={item.id}
        onClick={() =>
          handleSelectedItem(item.medical_speciality_name, "speciality")
        }
        className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
      >
        {item.medical_speciality_name}
      </h1>
    ));
  };

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row justify-between md:gap-10 sm:gap-4 xs:gap-2 xsm:gap-1"
    >
      {items.map((item) => (
        <div
          className={`${
            showBorder ? "border-b-2 border-gray-400 pb-7" : ""
          } flex relative items-center  `}
          key={item.id}
        >
          <h2
            className={`font-sansBold text-[.8rem]  tracking-[2px] ${
              showBorder ? "mt-3" : ""
            } ${className} `}
          >
            {selectedItemList[item.id] ||
              item.medical_condition_name ||
              item.title}
          </h2>
          <div
            className="ml-auto md:ml-5 cursor-pointer xl:pl-[4rem]"
            onClick={() => handleItemClick(item.id)}
          >
            <img
              src={image}
              alt=""
              className={`${
                selectedItem === item.id ? "rotate-180" : ""
              } cursor-pointer h-3 w-3`}
            />
          </div>
          <div
            className={`${
              !showBorder &&
              "border-l  border-none md:border-l lg:border-l border-gray-400 h-[50px] ml-10 mr-5"
            }`}
          ></div>
          {selectedItem === item.id && (
            <div
              className="absolute top-10 bg-white w-full p-5 rounded-lg max-h-[30vh] overflow-y-auto"
              style={{
                zIndex: 1,
              }}
            >
              {loader ? (
                <h1>Loading..</h1>
              ) : (
                memoizedMedicalConditionListData &&
                memoizedMedicalConditionListData?.map((data) => (
                  <h1
                    key={data.id}
                    className="cursor-pointer text-[14px] hover:underline mt-1 font-sansRegular text-gray-700 tracking-[0.1rem]"
                  >
                    {data?.speciality_name}
                  </h1>
                ))
              )}
              {item.id === "location" && locationItems()}

              {item.id === "speciality" && specialityItems()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
