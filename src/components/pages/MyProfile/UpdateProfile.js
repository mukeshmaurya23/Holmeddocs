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
  };

  const location = useLocation();
  const { phone } = location.state;

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
      patient_first_name: formik.values.patient_first_name,
      patient_last_name: formik.values.patient_last_name,
      patient_email: formik.values.patient_email,
      insurance_company: selectedItemList.insurance.id,
      policy_number: formik.values.policy_number,
      address1: formik.values.address1,
      zip_code_id: selectedItemList.zip_code_id.id,
      apartment: formik.values.apartment,
      patient_gender: formik.values.patient_gender,
      patient_dob: formik.values.patient_dob,
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

  const insuranceDispatch = useDispatch();
  const stateDispatch = useDispatch();
  const cityDispatch = useDispatch();
  const zipCodeDispatch = useDispatch();
  const { insuranceData, insuranceStatus } = useSelector((state) => state.api);

  const { stateData, stateStatus } = useSelector((state) => state.api);
  useEffect(() => {
    insuranceDispatch(fetchInsuranceData("/patient/master/insurance"));
  }, [insuranceDispatch]);

  useEffect(() => {
    stateDispatch(fetchStateData("/patient/master/state"));
  }, [stateDispatch]);

  const { cityData, cityStatus } = useSelector((state) => state.api);
  useEffect(() => {
    cityDispatch(fetchCityData("/patient/master/city"));
  }, [cityDispatch]);

  const { zipCodeData, zipCodeStatus } = useSelector((state) => state.api);
  useEffect(() => {
    zipCodeDispatch(fetchZipCodeData("/patient/master/zip"));
  }, [zipCodeDispatch]);

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
                  value={formik.values.patient_first_name}
                  placeholder="Enter your first name"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
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
                  value={formik.values.patient_last_name}
                  id="patient_last_name"
                  placeholder="Enter your last name"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
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
                  className="border border-verifiCation  rounded py-2 px-4 text-formLabel text-[12px] sm:text-[14px]"
                  id="patient_gender"
                  name="patient_gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patient_gender}
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
                  value={formik.values.patient_dob}
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-[6px] px-4 text-[12px] sm:text-[14px]"
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={phone}
                  id="patient_phone"
                  disabled
                  placeholder="XXX XXX XXXX"
                  className="border border-verifiCation outline-verifiCation bg-gray-200 text-formLabel rounded py-2 px-7 sm:px-8 text-[10px] sm:text-[14px]"
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
                  value={formik.values.patient_email}
                  id="patient_email"
                  placeholder="email@domain.com"
                  className="border border-verifiCation text-formLabel outline-verifiCation rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.patient_email &&
                  formik.touched.patient_email && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.patient_email}
                    </div>
                  )}
              </div>
              <div className="flex flex-col  w-1/2 relative p-[10px]">
                <Label
                  htmlFor="insurance_company"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Select Your Insurance
                </Label>

                <Input
                  type="text"
                  id="insurance_company"
                  name="insurance_company"
                  onBlur={formik.handleBlur}
                  value={
                    selectedItemList.insurance.insurance_company_name || ""
                  }
                  placeholder="select"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  ref={insuranceRef}
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
                      ? "absolute mt-1 px-6 top-20 max-h-60 z-10 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      : ""
                  }`}
                >
                  {isInsuranceDropdown
                    ? insuranceStatus === "loading"
                      ? "Loading..."
                      : insuranceData &&
                        insuranceData.map((item) => (
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

                {/* <ul
                  className={`${
                    isInsuranceDropdown
                      ? "absolute mt-1 px-6 top-20 max-h-60 z-10 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      : ""
                  }`}
                >
                  {isInsuranceDropdown &&
                    (insuranceStatus === "loading" ? (
                      "Loading..."
                    ) : (
                      <li
                        className="text-formLabel text-[12px] cursor-pointer relative"
                        key={item.id}
                        onClick={() =>
                          handleSelectedItem(
                            item.insurance_company_name,
                            "insurance"
                          )
                        }
                      >
                        {item.insurance_company_name}
                      </li>
                    ))}
                </ul> */}
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
                  value={formik.values.policy_number}
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
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
                  value={formik.values.apartment}
                  placeholder="Building/Apartment/Unit"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
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
                  value={formik.values.address1}
                  placeholder="Enter your address"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.address1 && formik.touched.address1 && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.address1}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap px-4 sm:px-24">
              {/* <div className="relative flex flex-col w-1/3 p-[10px]">
                <Label
                  htmlFor="city_id"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  City
                </Label>
                <Input
                  type="text"
                  name="city_id"
                  id="city_id"
                  onFocus={() => setCityDropDown(true)}
                  placeholder="city"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {cityDropDown
                  ? cityStatus === "loading"
                    ? "Loading..."
                    : cityData &&
                      cityData.map((item) => (
                        <li
                          className="text-formLabel text-[12px] cursor-pointer relative"
                          key={item.id}
                          onClick={() =>
                            handleSelectedItem(item?.id, "city_id")
                          }
                        >
                          {item.city_name}
                        </li>
                      ))
                  : null}
              </div> */}
              <div
                className="relative flex flex-col w-1/3 p-[10px]"
                ref={cityRef}
              >
                <Label
                  htmlFor="city_id"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  City
                </Label>
                <Input
                  type="text"
                  name="city_id"
                  id="city_id"
                  value={selectedItemList.city_id.city_name}
                  onFocus={() => setCityDropDown(true)}
                  placeholder="city"
                  autoComplete="nope"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {IscityDropDown ? (
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
                        cityData.map((item) => (
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
                  value={selectedItemList.zip_code_id.zip}
                  placeholder="zip code"
                  autoComplete="nope"
                  onFocus={() => setZipCodeDropDown(true)}
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                {formik.errors.zip_code_id && formik.touched.zip_code_id && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.zip_code_id}
                  </div>
                )}
                <ul
                  className={`${
                    IsZipCodeDropDown
                      ? "absolute mt-1 px-6 top-20 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      : ""
                  }`}
                >
                  {IsZipCodeDropDown
                    ? zipCodeStatus === "loading"
                      ? "Loading..."
                      : zipCodeData &&
                        zipCodeData.map((item) => (
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
                        ))
                    : null}
                </ul>
              </div>
              <div className="flex relative flex-col w-1/3 p-[10px]">
                <Label
                  htmlFor="state"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  State
                </Label>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="select"
                  value={selectedItemList.state.state_name || ""}
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[14px]"
                />
                <img
                  src={greenArrowDown}
                  alt=""
                  ref={stateRef}
                  onClick={() => setIsStateDropDown(!isStateDropdown)}
                  className={`w-3 h-3 mr-2 cursor-pointer absolute right-4 top-[3.3rem] `}
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
                        stateData.map((item) => (
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
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 mb-10">
          <Button
            onClick={handleSubmit}
            type="submit"
            className="bg-verifiCation cursor-pointer text-white font-sansMedium text-[14px] py-2 px-10 rounded-full"
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
