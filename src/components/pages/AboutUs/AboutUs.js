import React from "react";
import sclHealth from "../../../images/about/SCL.png";
import mountSinai from "../../../images/about/Mount.png";
import monteFiore from "../../../images/about/Montefiore.png";
import Mission from "../../../images/about/Mission.png";
import LongArrow from "../../../images/about/LongArrowRight.png";
import AboutUsBg from "../../../images/about/AboutUsBg.png";
import Button from "../../../util/Button";
import doctorPatient from "../../../images/about/doctor-patient.png";
import Footer from "../../../UI/Footer";
const StrengthData = [
  {
    id: 1,
    image: require("../../../images/about/Person1.png"),
    name: "Alexander O. Babazadeh ",
    designation: "Founder Of Holmeddoc",
  },
  {
    id: 2,
    image: require("../../../images/about/Person2.png"),
    name: "Alizeh Khan ",
    designation: "Co- Founder",
  },
  {
    id: 3,
    image: require("../../../images/about/Person3.png"),
    name: "Maheep",
    designation: "Co- Founder & VP Operation",
  },
];
const ApproacData = [
  {
    id: 1,
    image: require("../../../images/about/Approach1.png"),
    title: "Connect",
    description:
      "Seamless way for patients to search for holistic providers and schedule appointments directly from the platform!",
  },
  {
    id: 2,
    image: require("../../../images/about/Approach2.png"),
    title: "Trust",
    description:
      "Seamless way for patients to search for holistic providers and schedule appointments directly from the platform!",
  },
  {
    id: 3,
    image: require("../../../images/about/Approach3.png"),
    title: "Transparency",
    description:
      "Seamless way for patients to search for holistic providers and schedule appointments directly from the platform!",
  },
];
const AboutUs = () => {
  return (
    <>
      <div className="overflow-hidden  max-w-[1560px] mx-auto">
        <section className="relative mb-16">
          {/*First Div */}

          <h1 className="absolute font-poppinsMedium text-[#000000] text-[1rem] sm:text-[2.3rem] md:text-[2.5rem]  lg:text-[2.8rem] xl:text-[2.9rem] 2xl:text-[3rem] tracking-[4px] top-1/2 left-[1rem] sm:left-[4rem] md:left-[5rem] lg:left-[6rem] xl:left-[6.3rem] 2xl:left-[6.4rem]">
            About Us
          </h1>
          <img src={AboutUsBg} alt="" className="w-[100%] h-auto" />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 px-2 md:px-10 py-2 space-y-4 ">
          {/*second Div */}
          <div className="px-4 md:px-16">
            <div className="w-[100px] h-1 mb-4 bg-aboutUsBorder"></div>
            <h2 className="text-[#292F33] font-sansBold text-2xl xl:text-4xl tracking-[2px]">
              Know about Holmeddoc
            </h2>
            <p className="text-gray-500 text-[16px] 2xl:text-[17px]   mt-7 font-semibold">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </p>
            <Button className="bg-verifiCation text-white px-16 py-2 mt-10 rounded-full">
              Know More
            </Button>
          </div>

          <img
            src={doctorPatient}
            alt=""
            className="w-[590px] ml-0 md:ml-[2rem] h-[340px] object-contain"
          />
        </section>
        <section className="px-2 md:px-10 py-2 space-y-4 mb-1 md:mb-16">
          {" "}
          {/*Third Div */}
          <div className="px-4 md:px-16 mt-12">
            <div className="w-[100px] h-1 mb-4 bg-aboutUsBorder"></div>
            <h2 className="text-[#292F33] font-sansBold text-2xl xl:text-4xl tracking-[2px]">
              Our approach to healthcare
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly items-center mr-5 py-10 p-5">
            {ApproacData?.map((data) => (
              <div
                className="flex flex-col items-center justify-center mb-10 cursor-pointer"
                key={data.id}
              >
                <img
                  src={data.image}
                  alt=""
                  className="w-[55px] h-auto object-contain"
                />
                <h1 className="text-[#292F33] font-sansBold text-[1.2rem]  mt-4">
                  {data.title}
                </h1>
                <p className="text-[1rem] font-semibold text-gray-500 mt-2  text-center px-10 py-2 max-w-[370px] md:max-w-[400px]">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-[#47C7C612] px-2 md:px-10 py-2 space-y-4  pb-10 mb-16">
          {/*Fourth Div */}
          <div className="px-4 md:px-16 py-10">
            <div className="w-[100px] h-1 mb-4 bg-aboutUsBorder"></div>
            <h2 className="text-[#292F33] font-sansBold text-2xl xl:text-4xl tracking-[2px]">
              Strength Of the Team
            </h2>
          </div>
          <div className="flex justify-evenly flex-col md:flex-row">
            {StrengthData.map((data) => (
              <div
                className="flex flex-col items-center justify-center mb-10"
                key={data.id}
              >
                <img
                  src={data.image}
                  alt=""
                  className="w-[200px] h-[200px] object-cover"
                />
                <h1 className="text-[#292F33] font-sansBold text-[1.2rem]  mt-4">
                  {data.name}
                </h1>
                <h1 className="text-gray-500 font-semibold font-sansRegular text-[.9rem] 2xl:text-[1rem] mt-2">
                  {data.designation}
                </h1>
              </div>
            ))}
          </div>
          <img
            src={LongArrow}
            alt=""
            className="w-[75px] h-auto ml-auto mr-10 "
          />
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 px-2 md:px-10 py-2 space-y-4 mb-16">
          {/*Fifth Div */}
          <div className="px-4 md:px-16">
            <div className="w-[100px] h-1 mb-4 bg-aboutUsBorder"></div>
            <h2 className="text-[#292F33] font-sansBold text-2xl xl:text-4xl tracking-[2px]">
              Our Mission
            </h2>
            <p className="text-gray-500 text-[16px] 2xl:text-[17px]   mt-7 font-semibold">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </p>
          </div>
          <div>
            <img
              src={Mission}
              alt=""
              // className="w-[550px] h-auto object-contain"
              className="w-[590px] ml-0 md:ml-[4rem]  object-contain"
            />
          </div>
        </section>
        <section className=" px-2 md:px-10 py-2 space-y-4 mb-10 pb-6">
          {/*Six Div */}

          <div className="px-4 md:px-16">
            <div className="w-[100px] h-1 mb-4 bg-aboutUsBorder"></div>
            <h2 className="text-[#292F33] font-sansBold text-2xl xl:text-4xl tracking-[2px]">
              Our Partners
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-evenly py-5 md:py-10 items-center space-y-10 md:space-y-0  mr-5">
            <img
              src={monteFiore}
              alt="monteFiore"
              className="w-[130px] h-[30px] md:w-[200px] md:h-[50px]"
            />
            <img
              src={mountSinai}
              alt="mountSinai"
              className="w-[130px] h-[30px] md:w-[200px] md:h-[50px]"
            />
            <img
              src={sclHealth}
              alt="sclHealth"
              className="w-[130px] h-[30px] md:w-[200px] md:h-[50px]"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
