import React, { useState, useEffect, useRef } from "react";
import { getAllMedicalConditionList } from "../services/services";
import { setSelectedItem } from "../store/healthConcernSlice";
import Spinner from "../UI/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Accordion = ({
  items,

  showBorder,
  image,
  className,
}) => {
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [medicalConditionListData, setMedicalConditionListData] =
  //   useState(null);
  const medicalConditionListData = useSelector(
    (state) => state.healthConcern.medicalConditionListData
  );
  const loader = useSelector((state) => state.healthConcern.loader);

  const selectedItem = useSelector((state) => state.healthConcern.selectedItem);
  const dispatch = useDispatch();
  const [selectedItemList, setSelectedItemList] = useState({
    location: "",
    speciality: "",
  });
  const [getSpecialityId, setSpecialityId] = useState(null);
  const [getSpecialityName, setSpecialityName] = useState(null);

  const handleItemClick = (id) => {
    dispatch(setSelectedItem(id));
  };

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        dispatch(setSelectedItem(null));
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  const getSpeciality = (id, name) => () => {
    console.log(id, "im id");
    setSpecialityId(id);
    setSpecialityName(name);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (getSpecialityId) {
      const date = new Date();

      let url = "/doctor-listing?";
      url += `selectedSpeciality=${getSpecialityName}_${getSpecialityId}&date=${date.toISOString()}&`;
      navigate(url);
    }
  }, [getSpecialityId]);

  return (
    <div
      ref={ref}
      className="w-full flex flex-col md:flex-row justify-between md:gap-10 sm:gap-4 xs:gap-2 xsm:gap-1"
    >
      {items?.map((item) => (
        <div
          className={`${
            showBorder ? "border-b-2 border-gray-400 pb-7" : ""
          } flex relative  w-full items-center justify-between  `}
          key={item.id}
        >
          <div
            className="flex justify-between items-center flex-1 cursor-pointer"
            onClick={() => handleItemClick(item.id)}
          >
            {" "}
            <h2
              className={`font-sansBold 2xl:text-[1.2rem] lg:text-[1rem] text-[.9rem] tracking-[2px] ${
                showBorder ? "mt-3" : ""
              } ${className} `}
            >
              {selectedItemList[item.id] || item.medical_condition_name}
            </h2>
            <img
              src={image}
              alt=""
              className={`${
                selectedItem === item.id ? "rotate-180" : ""
              } cursor-pointer h-3 w-3 `}
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
              className="absolute top-20 bg-white w-full p-5 rounded-lg max-h-[30vh] overflow-y-auto"
              style={{
                zIndex: 1,
              }}
            >
              {loader ? (
                <Spinner />
              ) : (
                medicalConditionListData &&
                medicalConditionListData?.map((data) => (
                  <h1
                    onClick={getSpeciality(
                      data?.speciality_id,
                      data?.speciality_name
                    )}
                    key={data.id}
                    className="cursor-pointer text-[13px] hover:underline mt-1 font-sansBold text-gray-700 "
                  >
                    {data?.speciality_name}
                  </h1>
                ))
              )}
              {/* {item.id === "location" && locationItems()}

              {item.id === "speciality" && specialityItems()} */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
