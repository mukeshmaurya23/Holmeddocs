import React, { useEffect, useState, useRef } from "react";
import Button from "../../../util/Button";
import Label from "../../../util/Label";
import Input from "../../../util/Input";
import { useFormik } from "formik";
import { updateProfileSchema } from "../../../schema/formValidation";
import customAxios from "../../../axios/custom";
import { enqueueSnackbar } from "notistack";
import greenArrowDown from "../../../images/GreenArrowDown.png";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchCityData,
  fetchInsuranceData,
  fetchStateData,
  fetchZipCodeData,
} from "../../../store/apiSlice";

import { filterFunctionality } from "../../../constant";
const UpdateProfile = () => {
  const [isInsuranceDropdown, setIsInsuranceDropDown] = useState(false);
  const [isStateDropdown, setIsStateDropDown] = useState(false);
  const [selectedItemList, setSelectedItemList] = useState({
    insurance: "",
    state: "",
    city_id: "",
    zip_code_id: "",
  });
  const [IscityDropDown, setCityDropDown] = useState(false);
  const [IsZipCodeDropDown, setZipCodeDropDown] = useState(false);
  const handleSelectedItem = (name, type) => {
    console.log(name, type);
    // setSelectedItemList(name);
    setSelectedItemList((prevSelectedItemList) => {
      return { ...prevSelectedItemList, [type]: name };
    });
    if (type === "insurance") {
      setIsInsuranceDropDown(false);
    }
    if (type === "state") {
      setIsStateDropDown(false);
    }
    if (type === "city_id") {
      setCityDropDown(false);
    }
    if (type === "zip_code_id") {
      setZipCodeDropDown(false);
    }
  };
  const [isStateSelected, setIsStateSelected] = useState(false);
  const location = useLocation();
  const { profileData } = location.state;
  console.log(profileData, "im profile data************");
  console.log(selectedItemList);
  const insuranceRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const formik = useFormik({
    initialValues: {
      patient_first_name: "",
      patient_last_name: "",

      patient_email: "",
      patient_gender: "",
      patient_dob: "",
      city_id: "",
      state_id: "",
      zip_code_id: "",
      policy_number: "",
      apartment: "",
      address1: "",

      insurance_company: "",
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const isFormValid =
    //   formik.isValid && Object.keys(formik.touched).length > 0;

    // const isFormInvalid = formik.isValid;
    // if (formik.dirty) {
    //   enqueueSnackbar("Please fill in all required fields", {
    //     variant: "error",
    //   });
    //   formik.setTouched({
    //     patient_first_name: true,
    //     patient_last_name: true,
    //     patient_email: true,
    //     patient_gender: true,
    //     patient_dob: true,

    //     policy_number: true,
    //     apartment: true,
    //     address1: true,
    //   });
    //   return;
    // }
    const data = {
      patient_first_name:
        formik.values.patient_first_name || profileData?.patient_first_name,
      patient_last_name:
        formik.values.patient_last_name || profileData?.patient_last_name,
      patient_email: formik.values.patient_email || profileData?.patient_email,
      insurance_company: selectedItemList.insurance.id,
      policy_number: formik.values.policy_number || profileData?.policy_number,
      address1: formik.values.address1 || profileData?.address1,
      zip_code_id: selectedItemList.zip_code_id.id,
      apartment: formik.values.apartment || profileData?.apartment,
      patient_gender:
        formik.values.patient_gender || profileData?.patient_gender,
      patient_dob: formik.values.patient_dob || profileData?.patient_dob,
      city_id: selectedItemList.city_id.id,
      state_id: selectedItemList.state.id,
    };
    // console.log(data, "im data");
    console.log(data, "im data");
    //check if all filed required if any of field is not filled then  show msg to user

    try {
      const response = await customAxios.post("/patient/edit_profile", data);
      console.log(response);
      enqueueSnackbar(response?.data?.message, {
        variant: response.data.success ? "success" : "error",
      });
      if (response.success === 1) {
        formik.resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!insuranceRef?.current?.contains(event.target)) {
        setIsInsuranceDropDown(false);
      }
      if (!stateRef?.current?.contains(event.target)) {
        setIsStateDropDown(false);
      }
      if (!cityRef?.current?.contains(event.target)) {
        setCityDropDown(false);
      }
      if (!zipCodeRef?.current?.contains(event.target)) {
        setZipCodeDropDown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [insuranceRef, stateRef, cityRef, zipCodeRef]);

  const stateDispatch = useDispatch();
  const cityDispatch = useDispatch();
  const zipCodeDispatch = useDispatch();
  const { insuranceData, insuranceStatus, filterInsuranceData } = useSelector(
    (state) => state.api
  );

  const { stateData, stateStatus, filterStateData } = useSelector(
    (state) => state.api
  );

  useEffect(() => {
    stateDispatch(fetchStateData("/patient/master/state"));
  }, [stateDispatch]);

  const { cityData, cityStatus, filterCityData } = useSelector(
    (state) => state.api
  );

  const { zipCodeData, zipCodeStatus, filterZipCodeData } = useSelector(
    (state) => state.api
  );

  useEffect(() => {
    if (selectedItemList.state.id) {
      cityDispatch(
        fetchCityData({
          url: "/patient/master/city",
          state_id: selectedItemList.state.id,
        })
      );
      // setCityDropDown(true); // Open city dropdown when state is selected
    }
    if (selectedItemList.state.id) {
      setCityDropDown(true);
      setIsStateSelected(true);
      cityRef.current.focus();
    } else {
      setIsStateSelected(false);
    }
  }, [cityDispatch, selectedItemList.state.id]);

  useEffect(() => {
    if (selectedItemList.state.id && selectedItemList.city_id.id) {
      zipCodeDispatch(
        fetchZipCodeData({
          url: "/patient/master/zip",
          state_id: selectedItemList.state.id,
          city_id: selectedItemList.city_id.id,
        })
      );
      // setZipCodeDropDown(true); // Open zip code dropdown when both state and city are selected
    }
    if (selectedItemList.state.id && selectedItemList.city_id.id) {
      setZipCodeDropDown(true);
      zipCodeRef.current.focus();
    }
  }, [zipCodeDispatch, selectedItemList.state.id, selectedItemList.city_id.id]);

  //   stateData?.find((item) => item.id === profileData?.state_id)?.state_name ||

  const [insurnceValue, setInsuranceValue] = useState(
    profileData?.insurance_company
  );
  const [stateValue, setStateValue] = useState("");

  const [cityValue, setCityValue] = useState("");

  const [zipCodeValue, setZipCodeValue] = useState("");
  //filter functionality
  const [filterState, setFilterState] = useState(filterStateData);
  const [stateSearchValue, setStateSearchValue] = useState("");

  //for city
  const [filterCity, setFilterCity] = useState(filterCityData);
  const [citySearchValue, setCitySearchValue] = useState("");
  console.log(filterCityData, "im filterCityData>>>>>>>>>>>>>>>");
  const handleStateSearch = (e) => {
    setStateSearchValue(e.target.value);
    setFilterState(
      filterFunctionality(stateSearchValue, filterStateData, "state_name")
    );
  };
  //for city
  const handleCitySearch = (e) => {
    setCitySearchValue(e.target.value);
    setFilterCity(
      filterFunctionality(citySearchValue, filterCityData, "city_name")
    );
  };

  //for zip
  // const[filterZip,setFilterZip]=useState(filterZipCodeData)
  // const[zipSearchValue,setZipSearchValue]=useState("")
  // const handleZipSearch = (e) => {
  //   setZipSearchValue(e.target.value);
  //   setFilterZip(
  //     filterFunctionality(zipSearchValue, filterZipCodeData, "zip")
  //   );
  // }

  //for insurance
  const [filterInsurance, setFilterInsurance] = useState(filterInsuranceData);
  const [insuranceSearchValue, setInsuranceSearchValue] = useState("");
  const handleInsuranceSearch = (e) => {
    setInsuranceSearchValue(e.target.value);
    setFilterInsurance(
      filterFunctionality(
        insuranceSearchValue,
        filterInsuranceData,
        "insurance_company_name"
      )
    );
  };

  return (
    <>
      <h2 className="text-[1.4rem] mt-14 font-sansRegular tracking-[2px] text-black  text-center">
        Update Profile
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex flex-wrap px-4 sm:px-24 py-5">
              <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
                <Label
                  htmlFor="patient_first_name"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  name="patient_first_name"
                  id="patient_first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.patient_first_name ||
                    profileData?.patient_first_name
                  }
                  placeholder="Enter your first name"
                  className="border border-verifiCation outline-verifiCation text-[#292f33] rounded py-2 px-4 text-[12px] sm:text-[14px] font-semibold"
                />

                {formik.errors.patient_first_name &&
                  formik.touched.patient_first_name && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.patient_first_name}
                    </div>
                  )}
              </div>
              <div className="flex flex-col w-1/2 sm:w-1/2 p-[10px]">
                <Label
                  htmlFor="patient_last_name"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  name="patient_last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.patient_last_name ||
                    profileData?.patient_last_name
                  }
                  id="patient_last_name"
                  placeholder="Enter your last name"
                  className="border border-verifiCation outline-verifiCation text-[#292f33] font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.patient_last_name &&
                  formik.touched.patient_last_name && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.patient_last_name}
                    </div>
                  )}
              </div>

              <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
                <Label
                  htmlFor="patient_gender"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Gender
                </Label>
                <select
                  className="border border-verifiCation  rounded py-2 px-4 text-[#292f33] font-semibold text-[12px] sm:text-[14px]"
                  id="patient_gender"
                  name="patient_gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.patient_gender || profileData?.patient_gender
                  }
                >
                  <option value="" className="text-formLabel">
                    Select
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.errors.patient_gender &&
                  formik.touched.patient_gender && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.patient_gender}
                    </div>
                  )}
              </div>
              <div className="flex flex-col w-1/2 p-[10px]">
                <Label
                  htmlFor="patient_dob"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  BirthDay
                </Label>
                <Input
                  type="date"
                  name="patient_dob"
                  id="patient_dob"
                  placeholder="MM/DD/YYYY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patient_dob || profileData?.patient_dob}
                  className="border border-verifiCation outline-verifiCation text-[#292f33] font-semibold rounded py-[6px] px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.patient_dob && formik.touched.patient_dob && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.patient_dob}
                  </div>
                )}
              </div>
              <div className="flex flex-col  w-1/2 p-[10px] relative">
                <Label
                  htmlFor="patient_phone"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Mobile Number
                </Label>
                <div className="absolute left-2 top-[2.3rem] sm:top-[2.86rem] w-3 pl-2  h-full text-md text-formLabel">
                  +1
                </div>
                <Input
                  type="number"
                  name="patient_phone"
                  value={profileData?.patient_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="patient_phone"
                  disabled
                  placeholder="XXX XXX XXXX"
                  className="border border-verifiCation outline-verifiCation bg-gray-200 text-[#292f33] font-semibold rounded py-2 px-7 sm:px-8 text-[10px] sm:text-[14px]"
                />
                {formik.errors.patient_phone &&
                  formik.touched.patient_phone && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.patient_phone}
                    </div>
                  )}
              </div>
              <div className="flex flex-col  w-1/2 p-[10px]">
                <Label
                  htmlFor="patient_email"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Email ID
                </Label>
                <Input
                  type="email"
                  name="patient_email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.patient_email || profileData?.patient_email
                  }
                  id="patient_email"
                  placeholder="email@domain.com"
                  className="border border-verifiCation text-[#292f33] font-semibold outline-verifiCation rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.patient_email &&
                  formik.touched.patient_email && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.patient_email}
                    </div>
                  )}
              </div>
              <div
                className="flex flex-col  w-1/2 relative p-[10px]"
                ref={insuranceRef}
              >
                <Label
                  htmlFor="insurance_company"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Select Your Insurance
                </Label>

                <input
                  type="text"
                  placeholder={"Select"}
                  id="insurance_company"
                  name="insurance_company"
                  onBlur={formik.handleBlur}
                  autoComplete="nope"
                  value={
                    selectedItemList.insurance.insurance_company_name ||
                    insurnceValue ||
                    insuranceSearchValue
                  }
                  onFocus={() => {
                    setInsuranceValue("") ||
                      setInsuranceSearchValue("") ||
                      setSelectedItemList({
                        ...selectedItemList,
                        insurance: {
                          ...selectedItemList.insurance,
                          insurance_company_name: "",
                        },
                      }) ||
                      setIsInsuranceDropDown(true);
                  }}
                  onChange={handleInsuranceSearch}
                  className="border border-verifiCation placeHolderText outline-verifiCation text-[#292f33] font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  onClick={() => {
                    setIsInsuranceDropDown(!isInsuranceDropdown);
                  }}
                  className={`w-3 h-3 mr-2 cursor-pointer absolute right-4 top-[3.3rem] ${
                    isInsuranceDropdown ? "rotate-180" : ""
                  } `}
                />
                {formik.errors.insurance_company &&
                  formik.touched.insurance_company && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.insurance_company}
                    </div>
                  )}
                <ul
                  className={`${
                    isInsuranceDropdown
                      ? "absolute mt-1 pl-5 top-20 max-h-60 z-10 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      : ""
                  }`}
                >
                  {isInsuranceDropdown
                    ? insuranceStatus === "loading"
                      ? "Loading..."
                      : insuranceData &&
                        filterInsurance.map((item) => (
                          <li
                            className="text-formLabel text-[12px] cursor-pointer relative"
                            key={item.id}
                            onClick={() =>
                              handleSelectedItem(
                                {
                                  id: item.id,
                                  insurance_company_name:
                                    item.insurance_company_name,
                                },
                                "insurance"
                              )
                            }
                          >
                            {item.insurance_company_name}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
              <div className="flex flex-col  w-1/2 relative p-[10px]">
                <Label
                  htmlFor="policy_number"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Policy Number
                </Label>
                <Input
                  name="policy_number"
                  id="policy_number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.policy_number || profileData?.policy_number
                  }
                  className="border border-verifiCation outline-verifiCation text-[#292f33] font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.policy_number &&
                  formik.touched.policy_number && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.policy_number}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap px-4 sm:px-24 mt-5">
              <div className="flex flex-col  w-full p-[10px]">
                <Label
                  htmlFor="apartment"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Apartment/Building/Unit
                </Label>
                <Input
                  type="text"
                  name="apartment"
                  id="apartment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apartment || profileData?.apartment}
                  placeholder="Building/Apartment/Unit"
                  className="border border-verifiCation outline-verifiCation text-[#292f33] font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.apartment && formik.touched.apartment && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.apartment}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap px-4 sm:px-24">
              <div className="flex flex-col  w-full p-[10px]">
                <Label
                  htmlFor="address1"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Street Address
                </Label>
                <Input
                  type="text"
                  name="address1"
                  id="address1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address1 || profileData?.address1}
                  placeholder="Enter your address"
                  className="border border-verifiCation outline-verifiCation text-[#292f33] font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.address1 && formik.touched.address1 && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.address1}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap px-4 sm:px-24">
              <div
                className="flex relative flex-col w-1/3 p-[10px]"
                ref={stateRef}
              >
                <Label
                  htmlFor="state"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  State
                </Label>
                <Input
                  ref={stateRef}
                  type="text"
                  name="state"
                  autoComplete="nope"
                  id="state"
                  placeholder="select"
                  value={
                    selectedItemList.state.state_name ||
                    stateValue ||
                    stateSearchValue
                  }
                  onFocus={() =>
                    setIsStateDropDown(true) ||
                    setStateValue("") ||
                    setStateSearchValue("") ||
                    setCitySearchValue("") ||
                    setSelectedItemList({
                      ...selectedItemList,
                      state: {
                        id: "",
                        state_name: "",
                      },
                      city_id: "",
                      city_name: "",
                      zip_code_id: "",
                    })
                  }
                  onChange={handleStateSearch}
                  className="border border-verifiCation outline-verifiCation text-[#292f33] placeHolderText font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />

                <ul
                  className={`${
                    isStateDropdown
                      ? "absolute mt-1 px-6 top-20 max-h-60 z-10 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      : ""
                  }`}
                >
                  {isStateDropdown
                    ? stateStatus === "loading"
                      ? "Loading..."
                      : stateData &&
                        filterState?.map((item) => (
                          <li
                            className="text-formLabel text-[12px] cursor-pointer relative"
                            key={item.id}
                            onClick={() =>
                              handleSelectedItem(
                                {
                                  id: item.id,
                                  state_name: item.state_name,
                                },
                                "state"
                              )
                            }
                          >
                            {item.state_name}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
              <div
                className="relative flex flex-col w-1/3 p-[10px] "
                ref={cityRef}
              >
                <Label
                  htmlFor="city_id"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  City
                </Label>
                <Input
                  ref={cityRef}
                  type="text"
                  name="city_id"
                  id="city_id"
                  value={
                    selectedItemList.city_id.city_name ||
                    cityValue ||
                    citySearchValue
                  }
                  onFocus={() =>
                    setCityDropDown(true) ||
                    setCityValue("") ||
                    setCitySearchValue("") ||
                    setSelectedItemList({
                      ...selectedItemList,
                      city_id: {
                        id: "",
                        city_name: "",
                      },
                      zip_code_id: "",
                    })
                  }
                  placeholder="city"
                  autoComplete="nope"
                  disabled={!selectedItemList.state.id}
                  onChange={handleCitySearch}
                  className={`border border-verifiCation outline-verifiCation placeHolderText text-[#292f33] font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px]  ${
                    !selectedItemList.state.id
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
                {IscityDropDown && selectedItemList.state.state_name ? (
                  <ul
                    className={`${
                      IscityDropDown
                        ? "absolute mt-1 px-6 top-20 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        : ""
                    }`}
                  >
                    {cityStatus === "loading"
                      ? "Loading..."
                      : cityData &&
                        filterCity?.map((item) => (
                          <li
                            className="text-formLabel text-[12px] cursor-pointer relative"
                            key={item.id}
                            onClick={() =>
                              handleSelectedItem(
                                {
                                  id: item.id,
                                  city_name: item.city_name,
                                },
                                "city_id"
                              )
                            }
                          >
                            {item.city_name}
                          </li>
                        ))}
                  </ul>
                ) : null}
              </div>
              <div
                className="flex relative flex-col w-1/3 p-[10px]"
                ref={zipCodeRef}
              >
                <Label
                  htmlFor="zip_code_id"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Zip
                </Label>
                <Input
                  type="text"
                  name="zip_code_id"
                  id="zip_code_id"
                  value={selectedItemList.zip_code_id.zip || zipCodeValue}
                  placeholder="zip code"
                  autoComplete="nope"
                  onFocus={() =>
                    setZipCodeDropDown(true) ||
                    setZipCodeValue("") ||
                    setSelectedItemList({
                      ...selectedItemList,
                      zip_code_id: {
                        id: "",
                        zip: "",
                      },
                    })
                  }
                  disabled={
                    !selectedItemList.state.id && !selectedItemList.city_id.id
                  }
                  className={`border border-verifiCation outline-verifiCation placeHolderText text-[#292f33] font-semibold rounded py-2 px-4 text-[12px] sm:text-[14px] ${
                    !selectedItemList.state.id || !selectedItemList.city_id.id
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
                {formik.errors.zip_code_id && formik.touched.zip_code_id && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.zip_code_id}
                  </div>
                )}

                {IsZipCodeDropDown &&
                selectedItemList.state.state_name &&
                selectedItemList.city_id.city_name ? (
                  <ul
                    className={`${
                      IsZipCodeDropDown
                        ? "absolute mt-1 px-6 top-20 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        : ""
                    }`}
                  >
                    {zipCodeStatus === "loading"
                      ? "Loading..."
                      : stateData &&
                        cityData &&
                        zipCodeData &&
                        zipCodeData?.map((item) => (
                          <li
                            className="text-formLabel text-[12px] cursor-pointer relative"
                            key={item.id}
                            onClick={() =>
                              handleSelectedItem(
                                {
                                  id: item.id,
                                  zip: item.zip,
                                },
                                "zip_code_id"
                              )
                            }
                          >
                            {item.zip}
                          </li>
                        ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 mb-10">
          <Button
            onClick={handleSubmit}
            type="submit"
            className="bg-verifiCation cursor-pointer text-white font-sansMedium text-[14px] py-2 px-16 rounded-full"
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
