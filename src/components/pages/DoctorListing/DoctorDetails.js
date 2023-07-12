import React, { useEffect, useState } from "react";
import Footer from "../../../UI/Footer";
import calendar from "../../../images/Calendar.png";
import Button from "../../../util/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../store/apiSlice";
import loadingGif from "../../../images/icons/Loader.gif";

import Modal from "../../../UI/Modal";
import DatePickerComponent from "../../../UI/DatePicker";
const DoctorDetails = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: doctorsList, status } = useSelector((state) => state.api);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const handleDateSelection = (date, timeSlots) => {
    setSelectedDate(date);
    setAvailableTimeSlots(timeSlots);
  };
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    dispatch(fetchData("/patient/doctors"));
  }, [dispatch]);
  const navigate = useNavigate();
  console.log(doctorsList, "doctorsList from details");

  const isLoggedIn = useSelector((state) => state.login.remember_token);

  const handleAppointment = () =>
    isLoggedIn
      ? navigate("/book-appointment", {
          state: {
            doctor: doctorsList?.data?.result?.filter(
              (doctor) => doctor.id == id
            ),
          },
        })
      : openModal();

  const DateComp = ({ timeSlotDate }) => {
    const date = new Date(timeSlotDate);
    const day = date?.getDate();
    const month = date?.toLocaleString("en-US", { month: "short" });
    //const formattedDate = `${day} ${month}`;
    return `${day} ${month}`;
  };

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return status === "loading" ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loadingGif} alt="loading" />
    </div>
  ) : (
    <>
      <h1 className="font-sansBold px-24 py-3 text-[1.4rem] tracking-[3px] mt-[8rem]">
        Medicine cure diseases but only doctors can cure patients.
      </h1>
      {doctorsList?.data?.result
        ?.filter((doctor) => doctor.id == id)
        ?.map((doctor) => {
          return (
            <section className="grid grid-cols-2 mb-10">
              <div className="mb-8 pl-24 col-span-1">
                <div className="flex py-6 ">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
                    alt="doctor"
                    className="h-[22rem] w-[19rem] rounded-lg object-cover"
                  />

                  <ul className="pl-5">
                    <li className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33]">
                      {doctor?.doctor_name}
                    </li>
                    <li className="font-sansRegular py-2 text-[13px] text-[#292F33]">
                      {doctor?.medical_speciality?.[0]} {doctor?.country?.[0]}
                    </li>

                    <li className="text-xs font-semibold text-[#292F33]">
                      Doctor of Medicine ({doctor?.education?.[0]})
                    </li>
                    <p className="gap-2 flex py-2 font-sansSemibold text-[13px]">
                      <div className="bg-[#b9eeeb] px-2 rounded-full">
                        <i class="fa fa-language  "></i>
                      </div>

                      {doctor?.languages_spoken?.map((language, index) => (
                        <span key={language}>
                          {language}
                          {index !== doctor?.languages_spoken?.length - 1 &&
                            " ,"}
                        </span>
                      ))}
                    </p>
                    <div className="flex gap-3 py-2 px-2">
                      <i className="fa fa-user h-2 w-5" aria-hidden="true"></i>
                      <p className="text-sm text-[#292F33]">
                        {doctor?.available_in?.map((available, index) => (
                          <span key={available}>
                            {available}
                            {index !== doctor?.available_in?.length - 1 &&
                              " , "}
                          </span>
                        ))}
                      </p>
                    </div>

                    <h2 className="font-Henriette mt-5 text-[1.2rem]">
                      Insurance
                    </h2>
                    <li className="font-sansRegular py-2 text-[13px]">
                      UHC, Humana, Aetna
                    </li>
                    <h2 className="font-Henriette mt-5 text-[1.2rem]">
                      Education
                    </h2>
                    <li className="font-sansRegular max-w-[250px] py-2 text-[13px]">
                      {doctor?.education?.map((education, index) => (
                        <span key={education}>
                          {education}
                          {index !== doctor?.education?.length - 1 && " , "}
                        </span>
                      ))}
                    </li>
                  </ul>
                </div>

                <div className="mt-[4rem]">
                  <h2 className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33]">
                    Availability
                  </h2>
                  <div className="flex flex-row flex-wrap ">
                    <div className=" py-2  flex flex-row flex-wrap gap-3  ">
                      {doctor?.time_slots?.InPerson?.map((timeSlot, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleDateSelection(timeSlot.date, timeSlot.value);
                          }}
                          className="bg-[#F2FCFE] flex justify-center items-center hover:bg-verifiCation hover:text-white rounded cursor-pointer"
                        >
                          <p className="px-5  text-xs font-semibold">
                            <DateComp timeSlotDate={timeSlot?.date} />
                          </p>
                        </div>
                      ))}
                      <div className="relative ">
                        <img
                          src={calendar}
                          alt="calendar"
                          className="h-auto w-12 cursor-pointer"
                          onClick={handleClick}
                        />
                        {isOpen && (
                          <div className="absolute top-[62px] right-2 z-[100] h-full">
                            <DatePickerComponent
                              handleChange={handleChange}
                              startDate={startDate}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <h2 className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33]">
                        {selectedDate}
                      </h2>
                      <ul className="flex flex-wrap gap-5 py-3">
                        {availableTimeSlots.map((timeSlot, index) => (
                          <li
                            key={index}
                            className="font-sansRegular py-2 px-5 text-[13px] bg-[#F2FCFE] hover:bg-verifiCation hover:text-white rounded-md"
                          >
                            {timeSlot?.to}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      className="bg-verifiCation rounded-full text-white  text-[13px] py-2 px-5 font-sansLight"
                      onClick={handleAppointment}
                    >
                      Schedule an Appointment
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-1 mr-[4rem] py-6 pl-[12rem]">
                <h1 className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33]">
                  About {doctor?.doctor_name}
                </h1>
                <p className="py-3 text-sm text-[#545871]">
                  {doctor?.doctor_bio}
                </p>
                <h1 className="font-Henriette py-3 text-[1.1rem] tracking-[1px] text-[#292F33]">
                  Practise Location
                </h1>
                <p className="max-w-[280px] py-2 text-[13px] font-semibold text-[#292F33]">
                  {doctor?.country?.[0]}
                </p>
                <iframe
                  className="mt-5 h-60 w-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15080.731037074034!2d72.87535869905422!3d19.099636713754155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sSaki%20Naka%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1686410711545!5m2!1sen!2sin"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          );
        })}
      {modal && (
        <Modal
          closeModal={closeModal}
          text={"This action requires you to Login."}
          title={"Authentication Required"}
          btnText2={"Browse"}
          btnText={"Login"}
        />
      )}

      <Footer />
    </>
  );
};

export default DoctorDetails;
