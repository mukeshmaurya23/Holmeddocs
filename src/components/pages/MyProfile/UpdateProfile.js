import React from "react";
import Button from "../../../util/Button";
import Label from "../../../util/Label";
import Input from "../../../util/Input";
const UpdateProfile = () => {
  return (
    <>
      <h2 className="text-[1.4rem] mt-14 font-sansRegular tracking-[2px] text-black  text-center">
        Update Profile
      </h2>
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
                placeholder="Enter your first name"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
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
                id="patient_last_name"
                placeholder="Enter your last name"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
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
              >
                <option value="" className="text-formLabel">
                  Select
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
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
                name="patient_dobob"
                id="patient_dob"
                placeholder="MM/DD/YYYY"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-[6px] px-4 text-[12px] sm:text-[16px]"
              />
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
                type="number"
                name="mobile"
                id="mobile"
                placeholder="XXX XXX XXXX"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-7 sm:px-8 text-[10px] sm:text-[14px]"
              />
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
                id="patient_email"
                placeholder="email@domain.com"
                className="border border-verifiCation text-formLabel outline-verifiCation rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col  w-1/2 relative p-[10px]">
              <Label
                htmlFor="Insurance"
                className="font-sansRegular text-formLabel text-sm py-1"
              >
                Select Your Insurance
              </Label>
              <Input
                name="text"
                id="Insurance"
                placeholder="select"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col  w-1/2 relative p-[10px]">
              <Label
                htmlFor="policyNumber"
                className="font-sansRegular text-formLabel text-sm py-1"
              >
                Policy Number
              </Label>
              <Input
                name="text"
                id="policyNumber"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
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
                placeholder="Building/Apartment/Unit"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
          </div>
          <div className="flex flex-wrap px-4 sm:px-24">
            <div className="flex flex-col  w-full p-[10px]">
              <Label
                htmlFor="address"
                className="font-sansRegular text-formLabel text-sm py-1"
              >
                Street Address
              </Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
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
                htmlFor="zip"
                className="font-sansRegular text-formLabel text-sm py-1"
              >
                Zip
              </Label>
              <Input
                type="text"
                name="zip"
                id="zip"
                placeholder="zip"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 mb-10">
        <Button
          type="submit"
          className="bg-verifiCation text-white font-sansMedium text-[14px] py-2 px-10 rounded-full"
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default UpdateProfile;
