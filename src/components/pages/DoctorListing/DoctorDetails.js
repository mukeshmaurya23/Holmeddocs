import React, { useEffect, useState, useRef } from "react";
import Footer from "../../../UI/Footer";
import calendar from "../../../images/Calendar.png";
import Button from "../../../util/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlotAvialability } from "../../../store/apiSlice";
import loadingGif from "../../../images/icons/Loader.gif";
import TimeFormatter from "../../../util/TimeFormatter";
import Modal from "../../../UI/Modal";
import DatePickerComponent from "../../../UI/DatePicker";
import moment from "moment";
import TimeSlotsComponent from "./TimeSlotsComponent";
const DoctorDetails = ({ }) => {
  const { id } = useParams();

  const timeSlotDispatch = useDispatch();
  const { getAllDoctorsData: doctorsList, getAllDoctorsDataStatus } =
    useSelector((state) => state.api);
  const [startDate, setStartDate] = useState(new Date());
  //step 1 slot_avialability:{ InPerson:[{..}] ,Virtual:[{..}] }
  const { slot_avialability, slot_avialability_status } = useSelector(
    (state) => state.api
  );

  console.log(slot_avialability, "slot_avialability----");
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectDateTime, setSelectDateTime] = useState({
    date: "",
    time: "",
  });

  const [error, setError] = useState({
    date: "",
    time: "",
  });
  const [selectedType, setSelectedType] = useState("");
  const [timeSlotId, setTimeSlotId] = useState("");

  const calendarRef = useRef(null);
  const handleSelectedTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleDateSelection = (date, timeSlots, formatedDate) => {
    // const dateObj = new Date(date);
    // const day = dateObj?.getDate();
    // const month = dateObj?.toLocaleString("en-US", { month: "short" });
    // const year = dateObj?.getFullYear();
    // const formattedDate = `${day} ${month}, ${year}`;
    setSelectedDate(formatedDate);
    setSelectDateTime((prev) => ({ ...prev, date: date, time: null }));
    setError((prev) => ({ ...prev, date: "" }));

    //
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

  // useEffect(() => {

  // }, [timeSlotDispatch, formattedDate, id]);

  const navigate = useNavigate();

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
          timeSlotId: timeSlotId,
          type: selectedType,
        },
      })
      : openModal();
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const [showFullBio, setShowFullBio] = useState(false);

  const handleViewMore = () => {
    setShowFullBio(!showFullBio);
  };

  useEffect(() => {
    if (startDate) {
      const formattedDate = moment(startDate).format("YYYY-MM-DD");

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
    const day = moment(timeSlotDate).format("DD");
    const month = moment(timeSlotDate).format("MMM");

    //   const newDay=slot_avialability.InPerson
    return `${day} ${month}`;
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return getAllDoctorsDataStatus === "loading" ? (
    <div className="flex justify-center items-center h-screen">
      <img src={loadingGif} alt="loading" />
    </div>
  ) : (
    <>
      {doctorsList?.data?.result
        ?.filter((doctor) => doctor.id == id)
        ?.map((doctor) => {
          return (
            <section className="grid col-span-2  mb-10 max-w-[1580px] mx-auto">
              <h1 className=" font-sansBold sm:px-24 sm:py-3 xsm:p-3 text-[1rem] sm:text-[1.4rem] sm:tracking-[3px] mt-2 sm:mt-[10rem] md:text-[1.8rem]">
                Medicine cure diseases but only doctors can cure patients.
              </h1>
              <div className="mb-8 sm:pl-[3rem] p-5 col-span-1 md:px-24">
                <div className="flex py-6 flex-col md:flex-row ">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="doctor"
                    className="sm:h-[22rem] sm:w-[19rem] h-[25rem] w-full rounded-lg object"
                  />

                  <ul className="sm:pl-[2rem] xsm:mt-2 sm:pr-[2rem]">
                    <li className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33] md:text-[1.4rem]">
                      {doctor?.doctor_name}
                    </li>
                    <li className="font-sansRegular py-2 text-[13px] text-[#292F33]">
                      {doctor?.medical_speciality?.[0]} {doctor?.country?.[0]}
                    </li>

                    <li className="text-xs font-semibold text-[#292F33]">
                      {doctor?.education?.[0]}
                    </li>
                    <p className="gap-2 flex py-2 font-sansSemibold text-[13px]">
                      <div className="bg-[#b9eeeb] px-2 rounded-full">
                        <i className="fa fa-language  "></i>
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

                  <div className="flex-1 sm:mr-[4rem] py- sm:pl-[21rem] relative">
                    <h1 className="font-Henriette md:text-[1.4rem] tracking-[1px] text-[#292F33]">
                      About {doctor?.doctor_name}
                    </h1>
                    {/* <h1 className="font-Henriette md:text-[1.4rem] tracking-[1px] text-[#292F33]">
                      About {doctor?.doctor_name}
                    </h1>
                    <p
                      className={`mt-[1rem] text-sm text-[#545871] md:text-[1rem] overflow-auto max-h-[250px] ${
                        showFullBio
                          ? "scroll-smooth"
                          : `line-clamp-3 text-ellipsis overflow-hidden  whitespace-break-spaces`
                      }`}
                    >
                      {doctor?.doctor_bio}
                      <div className="flex py-5">
                        {showFullBio && (
                          <button
                            className="pr-10 text-[#CF8B15] underline text-md 2xl:text-[1.3rem] py-4 font-semibold font-sansRegular"
                            onClick={handleViewMore}
                          >
                            View Less
                          </button>
                        )}
                      </div>
                    </p>
                    {!showFullBio && (
                      <button
                        className="pr-10 text-[#CF8B15] underline text-md 2xl:text-[1.3rem] py-4 font-semibold font-sansRegular"
                        onClick={handleViewMore}
                      >
                        View More
                      </button>
                    )} */}

                    <div className=" max-h-[250px] overflow-auto">
                      <span
                        className={`mt-[1rem] text-sm text-[#545871] md:text-[1rem] overflow-hidden ${showFullBio ? "" : "line-clamp-3"
                          }`}
                      >
                        {doctor?.doctor_bio}
                      </span>
                      {showFullBio && (
                        <div className="flex py-5 mt-[1rem]">
                          <button
                            className="pr-10 text-[#CF8B15] underline text-md 2xl:text-[1.3rem] py-4 font-semibold font-sansRegular"
                            onClick={handleViewMore}
                          >
                            View Less
                          </button>
                        </div>
                      )}
                      {!showFullBio && (
                        <button
                          className="pr-10 text-[#CF8B15] underline text-md 2xl:text-[1.3rem] py-4 font-semibold font-sansRegular"
                          onClick={handleViewMore}
                        >
                          View More
                        </button>
                      )}
                    </div>
                    <div className="relative md:absolute md:top-[26rem] md:bottom-0 mx-auto">
                      <h1 className="font-Henriette py-3 text-[1.1rem] md:text-[1.4rem] tracking-[1px] text-[#292F33]">
                        Practise Location
                      </h1>
                      <p className="max-w-[280px] py-2 text-[13px] font-semibold text-[#292F33]">
                        {doctor?.country?.[0]}
                      </p>

                      <p className="py-5 text-[13px] text-center font-semibold text-[#292F33]">
                        Location Does Not Exit
                      </p>
                    </div>
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
                      ) : (
                        slot_avialability?.InPerson?.map((timeSlot, index) => {
                          const formattedDate = timeSlot.date;

                          const virtualData = doctor?.time_slots?.Virtual?.find(
                            (item) => item.date === formattedDate
                          );

                          return (
                            <>
                              <div
                                key={index}
                                className={`${timeSlot.value.length > 0 ||
                                    virtualData?.value.length > 0
                                    ? "bg-[#dcf9ff] hover:bg-verifiCation cursor-pointer hover:text-white"
                                    : "bg-[#ecf0f1] cursor-not-allowed"
                                  } flex justify-center items-center rounded
                            ${selectDateTime.date === timeSlot.date &&
                                  "bg-verifiCation text-white"
                                  }
                            `}
                                onClick={() => {
                                  if (timeSlot.value.length > 0) {
                                    handleDateSelection(
                                      timeSlot.date,
                                      timeSlot.value,
                                      formattedDate
                                    );
                                  }
                                  if (virtualData?.value.length > 0) {
                                    handleDateSelection(
                                      virtualData.date,
                                      virtualData.value,
                                      formattedDate
                                    );
                                  }
                                }}
                              >
                                <p
                                  className={`px-3 py-2 text-xs font-semibold  `}
                                >
                                  <DateComp timeSlotDate={timeSlot?.date} />
                                </p>
                              </div>
                            </>
                          );
                        })
                      )}

                      <div className="relative " ref={calendarRef}>
                        <img
                          src={calendar}
                          alt="calendar"
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
                  <div className="flex  mt-">
                    {error.date ? (
                      <p className="text-red-600 text-sm">{error.date}</p>
                    ) : error.time ? (
                      <p className="text-red-600 text-sm"> {error.time}</p>
                    ) : null}
                  </div>
                  <div className="cursor-pointer mt-10">
                    <h2 className="font-Henriette text-[1.1rem] tracking-[1px] text-[#292F33]">
                      {selectDateTime.date &&
                        moment(selectedDate).format("MMM DD, YYYY")}
                    </h2>
                    {slot_avialability.InPerson?.map((timeSlot, index) => {
                      const virtualData = doctor?.time_slots?.Virtual?.find(
                        (item) => item.date === timeSlot.date
                      );
                      return (
                        <>
                          {selectedDate === timeSlot.date && (
                            <div className="flex flex-wrap">
                              {timeSlot.value.length > 0 && (
                                <div className="flex flex-wrap flex-col p-[10px]">
                                  <p className="font-semibold py-2 font-sansRegular text-[13px]">
                                    InPerson
                                  </p>
                                  <ul className="flex gap-3">
                                    <TimeSlotsComponent
                                      type={"InPerson"}
                                      timeSlots={timeSlot.value}
                                      selectDateTime={selectDateTime}
                                      setTimeSlotId={setTimeSlotId}
                                      handleTimeSelection={handleTimeSelection}
                                      onSelectedTypeChange={
                                        handleSelectedTypeChange
                                      }
                                    />
                                  </ul>
                                </div>
                              )}
                              {virtualData?.value.length > 0 && (
                                <div className="flex flex-col flex-wrap p-[10px]">
                                  <p className="font-semibold py-2 font-sansRegular text-[13px]">
                                    Virtual
                                  </p>

                                  <ul className="flex gap-3">
                                    <TimeSlotsComponent
                                      type={"Virtual"}
                                      timeSlots={virtualData.value}
                                      selectDateTime={selectDateTime}
                                      setTimeSlotId={setTimeSlotId}
                                      handleTimeSelection={handleTimeSelection}
                                      onSelectedTypeChange={
                                        handleSelectedTypeChange
                                      }
                                    />
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                  <div className="flex md:justify-center md:mr-[18rem] mt-10">
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
