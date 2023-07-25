import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../util/Button";
import { Link, useNavigate } from "react-router-dom";
import cross from "../images/icons/Cross.png";
import cityLocation from "../images/CityLocation.png";
import customAxios from "../axios/custom";
import Spinner from "./Spinner";

const PortalModal = ({ closeModal }) => {
  const id = document.getElementById("portal-modal");
  const [loading, setLoading] = useState(false);
  const [operatingCity, setOperatingCity] = useState([]);
  useEffect(() => {
    const getOperatingCity = async () => {
      try {
        setLoading(true);
        const response = await customAxios.post("/patient/operating/city");
        // console.log(response.data,"im response from get operating city");
        setOperatingCity(response?.data?.data?.result);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getOperatingCity();
  }, []);

  const navigate = useNavigate();
  const handleCity = (city) => {
    console.log(city, "im city");
    navigate(`/make-appointment?city=${city}`);
    closeModal();
  };
  return ReactDOM.createPortal(
    <>
      <div className=" xsm:relative xsm:-mt-[7rem] md:fixed inset-0 z-50 flex sm:items-center justify-center md:mb-10 md:pb-10">
        <div
          className="fixed inset-0 bg-gray-900 opacity-50 cursor-pointer"
          onClick={closeModal}
        ></div>
        <div className="relative bg-white rounded-none sm:rounded-lg shadow-lg w-full sm:w-3/4 h-auto">
          <div className="bg-[#0082821C] px-8 py-4  relative rounded-lg  font-sansBold text-[1.2rem] text-[#292F33]">
            Browse Doctors near you
            <img
              src={cross}
              alt="close"
              onClick={closeModal}
              className="absolute right-10 top-5 cursor-pointer h-4 w-4"
            />
          </div>
          <div className="flex flex-wrap mb-10 ml-0 sm:ml-7">
            {loading ? (
              <div className="flex mt-5  justify-center items-center">
                <Spinner />
              </div>
            ) : (
              operatingCity.map((item) => (
                <div
                  className="flex ml-10 mt-4 pl-3 rounded-md bg-[#00828212] px-6 py-2  cursor-pointer"
                  key={item.id}
                  onClick={() => handleCity(item?.zip_code_id)}
                >
                  <img src={cityLocation} className="h-8 w-8" alt="" />
                  <p className="ml-4 text-verifiCation">{item?.city_name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>,
    id
  );
};

export default PortalModal;
