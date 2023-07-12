import React from "react";
import Button from "../../../util/Button";
import Label from "../../../util/Label";
import Input from "../../../util/Input";
import { useFormik } from "formik";
import { updateProfileSchema } from "../../../schema/formValidation";
const UpdateProfile = () => {
  const formik = useFormik({
    initialValues: {
      patient_first_name: "",
      patient_last_name: "",
      patient_gender: "",
      patient_dob: "",
      patient_email: "",
      patient_phone: "",
      policy_number: "",
      apartment: "",
      address1: "",
      zip_code_id: "",
      insurance_company: "",
    },
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSubmit = () => {
    formik.setTouched({
      patient_first_name: true,
      patient_last_name: true,
      patient_gender: true,
      patient_dob: true,
      patient_email: true,
      patient_phone: true,
      policy_number: true,
      apartment: true,
      address1: true,
      zip_code_id: true,
      insurance_company: true,
    });
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
                  value={formik.values.patient_first_name}
                  placeholder="Enter your first name"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
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
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
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
                  className="border border-verifiCation  rounded py-2 px-4 text-formLabel text-[12px] sm:text-[16px]"
                  id="patient_gender"
                  name="patient_gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patient_gender}
                >
                  <option value="" className="text-formLabel">
                    Select
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
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
                  type="text"
                  name="patient_dobob"
                  id="patient_dob"
                  placeholder="MM/DD/YYYY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patient_dob}
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-[6px] px-4 text-[12px] sm:text-[16px]"
                />
                {formik.errors.patient_dob && formik.touched.patient_dob && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.patient_dob}
                  </div>
                )}
              </div>
              <div className="flex flex-col  w-1/2 p-[10px] relative">
                <Label
                  htmlFor="mobile"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  Mobile Number
                </Label>
                <div className="absolute left-2 top-[2.3rem] sm:top-[2.86rem] w-3 pl-2  h-full text-md text-formLabel">
                  +1
                </div>
                <Input
                  type="text"
                  name="mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.patient_phone}
                  id="mobile"
                  placeholder="XXX XXX XXXX"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-7 sm:px-8 text-[10px] sm:text-[14px]"
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
                  className="border border-verifiCation text-formLabel outline-verifiCation rounded py-2 px-4 text-[12px] sm:text-[16px]"
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
                  id="insurance_company"
                  name="insurance_company"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.insurance_company}
                  placeholder="select"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
                />
                {formik.errors.insurance_company &&
                  formik.touched.insurance_company && (
                    <div className="text-red-400 text-xs mt-1">
                      {formik.errors.insurance_company}
                    </div>
                  )}
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
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
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
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
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
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
                />
                {formik.errors.address1 && formik.touched.address1 && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.address1}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap px-4 sm:px-24">
              <div className="flex flex-col w-1/3 p-[10px]">
                <Label
                  htmlFor="city"
                  className="font-sansRegular text-formLabel text-sm py-1"
                >
                  City
                </Label>
                <Input
                  type="text"
                  name="Locality"
                  id="Locality"
                  placeholder="Locality"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
                />
              </div>
              <div className="flex flex-col w-1/3 p-[10px]">
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
                  placeholder="state"
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
                />
              </div>
              <div className="flex flex-col w-1/3 p-[10px]">
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
                  placeholder="zip"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip_code_id}
                  className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
                />
                {formik.errors.zip_code_id && formik.touched.zip_code_id && (
                  <div className="text-red-400 text-xs mt-1">
                    {formik.errors.zip_code_id}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 mb-10">
          <Button
            onClick={handleSubmit}
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
