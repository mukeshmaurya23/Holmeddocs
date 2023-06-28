import React from "react";
import Button from "../../../util/Button";
import Label from "../../../util/Label";
import Input from "../../../util/Input";
const UpdateProfile = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mt-10 text-center">Update Profile</h2>
      <div className="grid grid-cols-2">
        <div>
          <div className="flex flex-wrap px-4 sm:px-24 py-5">
            <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
              <Label
                htmlFor="firstName"
                className="font-sansRegular text-formLabel text-sm"
              >
                First Name
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col w-1/2 sm:w-1/2 p-[10px]">
              <Label
                htmlFor="lastName"
                className="font-sansRegular text-formLabel text-sm"
              >
                Last Name
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>

            <div className="flex flex-col  w-1/2 sm:w-1/2 p-[10px]">
              <Label
                htmlFor="gender"
                className="font-sansRegular text-formLabel text-sm"
              >
                Gender
              </Label>
              <select
                className="border border-verifiCation  rounded-md py-2 px-4 text-formLabel text-[12px] sm:text-[16px]"
                id="gender"
                name="gender"
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
                htmlFor="dob"
                className="font-sansRegular text-formLabel text-sm"
              >
                DOB
              </Label>
              <Input
                type="text"
                name="dob"
                id="dob"
                placeholder="MM/DD/YYYY"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col  w-1/2 p-[10px] relative">
              <Label
                htmlFor="mobile"
                className="font-sansRegular text-formLabel text-sm"
              >
                Mobile Number
              </Label>
              <div className="absolute left-2 top-[2.3rem] sm:top-[2.46rem] w-3 pl-2  h-full text-md text-formLabel">
                +1
              </div>
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="XXX XXX XXXX"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-7 sm:px-8 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col  w-1/2 p-[10px]">
              <Label
                htmlFor="email"
                className="font-sansRegular text-formLabel text-sm"
              >
                Email ID
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email@domain.com"
                className="border border-verifiCation text-formLabel outline-verifiCation rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col  w-1/2 relative p-[10px]">
              <Label
                htmlFor="password"
                className="font-sansRegular text-formLabel text-sm"
              >
                Enter Password
              </Label>
              <Input
                name="password"
                id="password"
                placeholder="●●●●●●●●"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col  w-1/2 relative p-[10px]">
              <Label
                htmlFor="confirmPassword"
                className="font-sansRegular text-formLabel text-sm"
              >
                Confirm Password
              </Label>
              <Input
                name="confirmPassword"
                id="confirmPassword"
                placeholder="●●●●●●●●"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap px-4 sm:px-24 mt-5">
            <div className="flex flex-col  w-full p-[10px]">
              <Label
                htmlFor="address"
                className="font-sansRegular text-formLabel text-sm"
              >
                Apartment/Building/Unit
              </Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
          </div>
          <div className="flex flex-wrap px-4 sm:px-24">
            <div className="flex flex-col  w-full p-[10px]">
              <Label
                htmlFor="address"
                className="font-sansRegular text-formLabel text-sm"
              >
                Street Address
              </Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
          </div>
          <div className="flex flex-wrap px-4 sm:px-24">
            <div className="flex flex-col w-1/3 p-[10px]">
              <Label
                htmlFor="city"
                className="font-sansRegular text-formLabel text-sm"
              >
                City
              </Label>
              <Input
                type="text"
                name="city"
                id="citty"
                placeholder="city"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col w-1/3 p-[10px]">
              <Label
                htmlFor="state"
                className="font-sansRegular text-formLabel text-sm"
              >
                State
              </Label>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="state"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
            <div className="flex flex-col w-1/3 p-[10px]">
              <Label
                htmlFor="zip"
                className="font-sansRegular text-formLabel text-sm"
              >
                Zip
              </Label>
              <Input
                type="text"
                name="zip"
                id="zip"
                placeholder="zip"
                className="border border-verifiCation outline-verifiCation text-formLabel rounded-md py-2 px-4 text-[12px] sm:text-[16px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
