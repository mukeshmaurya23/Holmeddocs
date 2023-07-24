import React, { useEffect, useState, useRef } from "react";
import Footer from "../../../UI/Footer";
import calendar from "../../../images/Calendar.png";
import Button from "../../../util/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchSlotAvialability } from "../../../store/apiSlice";
import loadingGif from "../../../images/icons/Loader.gif";
import TimeFormatter from "../../../util/TimeFormatter";
import Modal from "../../../UI/Modal";
import DatePickerComponent from "../../../UI/DatePicker";

const DoctorDetails = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const timeSlotDispatch = useDispatch();
  const { data: doctorsList, status } = useSelector((state) => state.api);
  const { slot_avialability, slot_avialability_status } = useSelector(
    (state) => state.api
  );

  console.log(slot_avialability, "slot_avialability");
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const [selectDateTime, setSelectDateTime] = useState({
    date: "",
    time: "",
  });

  const [error, setError] = useState({
    date: "",
    time: "",
  });
  console.log(selectDateTime, "selectDateTime------------------");
  const calendarRef = useRef(null);

  const handleDateSelection = (date, timeSlots) => {
    const dateObj = new Date(date);
    const day = dateObj?.getDate();
    const month = dateObj?.toLocaleString("en-US", { month: "short" });
    const year = dateObj?.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
    setSelectedDate(formattedDate);
    setSelectDateTime((prev) => ({ ...prev, date: date, time: null }));
    setError((prev) => ({ ...prev, date: "" }));

    setAvailableTimeSlots(timeSlots);
  };
  const handleTimeSelection = (time) => {
    setSelectDateTime((prev) => ({ ...prev, time }));
    setError((prev) => ({ ...prev, time: "" }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!calendarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [calendarRef]);

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    dispatch(fetchData("/patient/doctors"));
  }, []);

  // useEffect(() => {

  // }, [timeSlotDispatch, formattedDate, id]);

  const navigate = useNavigate();
  console.log(doctorsList, "doctorsList from details");

  const isLoggedIn = useSelector((state) => state.login.remember_token);

  const handleAppointment = () => {
    if (!selectDateTime.date || !selectDateTime.time) {
      setError({
        date: selectDateTime.date ? "" : "Please select date and time",
        time: selectDateTime.time ? "" : "Please select time",
      });
      return;
    }
    return isLoggedIn
      ? navigate("/book-appointment", {
          state: {
            doctor: doctorsList?.data?.result?.filter(
              (doctor) => doctor.id == id
            ),
            date: selectDateTime.date,
            time: selectDateTime.time,
          },
        })
      : openModal();
  };

  const [startDate, setStartDate] = useState(new Date());
  const formattedDate = startDate.toISOString().split("T")[0];

  console.log(formattedDate, "startDate........from doctor details");
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };

  useEffect(() => {
    if (startDate) {
      const formattedDate = startDate.toISOString().split("T")[0];
      timeSlotDispatch(
        fetchSlotAvialability({
          url: "/patient/slot_availability",
          timeSlotDate: formattedDate,
          doctorId: parseInt(id),
        })
      );
    }
  }, [timeSlotDispatch, startDate, id]);

  const DateComp = ({ timeSlotDate }) => {
    const date = new Date(timeSlotDate);
    const day = date?.getDate();
    const month = date?.toLocaleString("en-US", { month: "short" });
    //const formattedDate = `${day} ${month}`;
    return `${day} ${month}`;
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return status === "loading" ? (
    <div className="flex justify-center items-center">
      <img src={loadingGif} alt="loading" />
    </div>
  ) : (
    <>
      <h1 className="font-sansBold sm:px-24 sm:py-3 xsm:p-3 text-[1rem] sm:text-[1.4rem] sm:tracking-[3px] mt-2 sm:mt-[10rem]">
        Medicine cure diseases but only doctors can cure patients.
      </h1>
      {doctorsList?.data?.result
        ?.filter((doctor) => doctor.id == id)
        ?.map((doctor) => {
          return (
            <section className="grid col-span-2  mb-10">
              <div className="mb-8 sm:pl-[3rem] p-5 col-span-1 md:px-24">
                <div className="flex py-6 flex-col sm:flex-row ">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
                    alt="doctor"
                    className="sm:h-[22rem] sm:w-[19rem] h-[25rem] w-full rounded-lg object-cover"
                  />

                  <ul className="sm:pl-[2rem] xsm:mt-2">
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

                  <div className="flex-1 sm:mr-[4rem] py- sm:pl-[10rem]">
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
                {/* <iframe
                  className="mt-5 h-60 w-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15080.731037074034!2d72.87535869905422!3d19.099636713754155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sSaki%20Naka%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1686410711545!5m2!1sen!2sin"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe> */}
                <p className="py-5 text-[13px] text-center font-semibold text-[#292F33]">
                  Location Does Not Exit
                </p>
              </div>
                </div>
               
                <div className="mt-[4rem]">
                  <h2 className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33]">
                    Availability
                  </h2>
                  <div className="flex flex-row flex-wrap ">
                    <div className=" py-2  flex flex-row flex-wrap gap-3  ">
                      {slot_avialability_status === "loading" ? (
                        <div className="flex justify-between gap-3">
                          {Array(7)
                            .fill("")
                            .map((_, index) => (
                              <div
                                className="h-10  px-7 py-2 w-full bg-gray-400 rounded-md"
                                key={index}
                              ></div>
                            ))}
                        </div>
                      ) : slot_avialability ? (
                        slot_avialability?.InPerson?.map((timeSlot, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              if (timeSlot.value.length > 0) {
                                handleDateSelection(
                                  timeSlot.date,
                                  timeSlot.value
                                );
                              }
                            }}
                            className={`${
                              timeSlot.value.length > 0
                                ? "bg-[#dcf9ff] hover:bg-verifiCation cursor-pointer hover:text-white"
                                : "bg-[#ecf0f1] cursor-not-allowed"
                            } flex justify-center items-center rounded
                            ${
                              selectDateTime.date === timeSlot.date &&
                              "bg-verifiCation text-white"
                            }
                            `}
                          >
                            <p className={`px-3 py-2 text-xs font-semibold  `}>
                              <DateComp timeSlotDate={timeSlot?.date} />
                            </p>
                          </div>
                        ))
                      ) : (
                        doctor?.time_slots?.InPerson?.map((timeSlot, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              if (timeSlot.value.length > 0) {
                                handleDateSelection(
                                  timeSlot.date,
                                  timeSlot.value
                                );
                              }
                            }}
                            className={` ${
                              timeSlot.value.length > 0
                                ? "bg-[#dcf9ff] hover:bg-verifiCation cursor-pointer hover:text-white"
                                : "bg-[#ecf0f1] cursor-not-allowed"
                            } flex justify-center items-center   rounded `}
                          >
                            <p className="px-3 py-2 text-xs font-semibold">
                              <DateComp timeSlotDate={timeSlot?.date} />
                            </p>
                          </div>
                        ))
                      )}

                      <div className="relative ">
                        <img
                          src={calendar}
                          alt="calendar"
                          ref={calendarRef}
                          className="h-auto w-10 cursor-pointer"
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
                  </div>
                  <div className="flex  mt-5">
                    {error.date ? (
                      <p className="text-red-600 text-sm">{error.date}</p>
                    ) : error.time ? (
                      <p className="text-red-600 text-sm"> {error.time}</p>
                    ) : null}
                  </div>
                  <div className="cursor-pointer mt-10">
                    <h2 className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33]">
                      {selectedDate}
                    </h2>
                    <ul className="flex flex-wrap gap-5 py-3">
                      {availableTimeSlots &&
                        availableTimeSlots.map((timeSlot, index) => (
                          <li
                            key={index}
                            className={`${
                              selectDateTime.time === timeSlot.to
                                ? "bg-verifiCation hover:bg-green-dark cursor-pointer text-white"
                                : "bg-[#dcf9ff] hover:bg-verifiCation hover:text-white cursor-pointer"
                            } font-sansRegular py-2 px-5 text-[13px] rounded-md`}
                            onClick={() => {
                              if (timeSlot.to) {
                                handleTimeSelection(timeSlot.to);
                              }
                            }}
                          >
                            <TimeFormatter time={timeSlot.to} />
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      className="bg-verifiCation rounded-full text-white  text-[13px] py-2 px-5 font-sansLight"
                      onClick={handleAppointment}
                    >
                      Schedule an Appointment
                    </Button>
                  </div>
                </div>
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
