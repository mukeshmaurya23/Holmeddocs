import React, { useEffect, useState } from "react";
import Button from "../../../util/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import customAxios from "../../../axios/custom";
import loadingGif from "../../../images/icons/Loader.gif";
const ProfileDetails = () => {
  // const getUserName = localStorage.getItem("userName");
  // const newName = JSON.parse(getUserName);

  // const user = useSelector((state) => state.login.user);
  // const dob = user.patient_dob;

  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const calcularteDob = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    console.log(birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m > 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  console.log(calcularteDob(profileData?.patient_dob), "age");

  useEffect(() => {
    const fetchUserProfileData = async () => {
      setLoading(true);
      try {
        const response = await customAxios.post("/patient/profile");
        setProfileData(response?.data?.data?.result);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchUserProfileData();
  }, []);

  console.log(profileData.patient_phone, "profileData");
  return loading ? (
    <div className="flex justify-center  ">
      <img src={loadingGif} alt="" />
    </div>
  ) : (
    <>
      <div className="flex justify-center items-center flex-col px-24 py-16">
        <h2 className="text-center font-sansRegular font-semibold text-[#292F33] text-[20px] tracking-[3px] mb-10">
          Profile Details
        </h2>
        <div className="border border-verifiCation rounded-xl  p-[30px]">
          <h2 className="text-center font-Henriette text-[20px]">
            {profileData?.patient_first_name}
          </h2>
          <div class="flex justify-between mx-3  mb-4 ">
            <div class=" flex  text-center items-center border border-verifiCation mt-8  ">
              <div class="border-r border-verifiCation p-6 ">
                <i class="fa fa-snowflake-o text-center" aria-hidden="true"></i>
                <p className="text-[10px] font-sansBold text-gray-600">
                  {profileData?.patient_gender}
                </p>
              </div>
              <div class=" border-r border-verifiCation p-7">
                <p class="text-center text-[10px] font-sansBold text-gray-600">
                  {calcularteDob(profileData.patient_dob)}
                </p>
                <p className="text-[10px] font-sansBold text-gray-600">
                  Years Old
                </p>
              </div>
              <div class=" border-r border-verifiCation p-6">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <p className="text-[10px] font-sansBold text-gray-600">
                  {profileData?.patient_phone}
                </p>
              </div>
              <div class=" ">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                <p className="text-[10px] font-sansBold text-gray-600 ml-2">
                  {profileData?.patient_email}
                </p>
              </div>
            </div>
          </div>

          <div class="border-b w-full"></div>
          <div className="flex flex-col  p-5">
            <div className="flex ">
              <i
                className="fa fa-location bg-gray-300 rounded-full p-3"
                aria-hidden="true"
              ></i>
              <p className="ml-4 text-[#9597A6] text-[13px] ">Address</p>
              <p className="ml-4 text-[#292F33] font-sansRegular text-[13px] font-semibold">
                {profileData?.address1}
              </p>
            </div>
            <div className="flex  mt-5">
              <i
                className="fa fa-location-arrow bg-gray-300 rounded-full p-3"
                aria-hidden="true"
              ></i>
              <div className="flex flex-col">
                <p className="ml-4 text-[#9597A6] text-[13px] ">
                  Insurance Details
                </p>
                <p className="ml-4 text-[#292F33] font-sansRegular text-[13px] font-semibold">
                  UHS, PN : 763529
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-5 max-w-[550px] mx-auto">
          <p className="font-sansBold text-[14px]">Note:</p>
          <p className="ml-3 font-sansRegular text-[#6B7276] text-[12px]">
            We attach great importance to protecting your private sphere and
            ensuring that your data are secure. We collect, process and store
            personal data (including IP addresses) only as permitted by law or
            if you have given your consent.
          </p>
        </div>
        <Link
          to="update-profile"
          state={{
            phone: profileData?.patient_phone,
          }}
        >
          <Button className="mt-10 bg-verifiCation px-8 uppercase py-2 text-[12px] rounded-full text-white tracking-[1px] font-semibold">
            Edit Profile
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ProfileDetails;
