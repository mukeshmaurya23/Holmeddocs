import React from "react";
import contact from "../images/contactus.jpg";
const dummyData = [
  {
    id: 3,
    logo: require("../images/profile/Mail.png"),
    title: "Email",
    text: " info@holmedddoc.com",
    text1: "info@holmedddoc.com",
  },
  {
    id: 2,
    logo: require("../images/profile/Number.png"),
    title: "Phone",
    text: " +1 234 567 890 00",
    text1: " +1 234 567 890 00",
  },
  {
    id: 1,
    logo: require("../images/profile/Address.png"),
    title: "Location",
    iframe:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15080.729189021102!2d72.87535870171241!3d19.099656990329475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8773cb2f051%3A0x40576ac944236b34!2sSaki%20Naka%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1688034989140!5m2!1sen!2sin",
  },
];
const ContactUs = () => {
  return (
    <>
      <section className="relative mb-5">
        <h2 className="text-white font-sansBold tracking-[3px] absolute font-semibold text-[1.1rem] md:text-[2.1rem]   left-10  top-1/3">
          Contact Us
        </h2>
        <img src={contact} alt="" className="w-[100%] h-auto" />
      </section>

      <section className="py-4">
        <h2 className="text-center font-sansSemibold text-black  text-[25px] tracking-[1px] ">
          Get in touch with us
        </h2>
        <h2 className="text-center font-sansSemibold text-[20px] mt-2 ">
          Info
        </h2>
        <p className="text-center max-w-[1080px] font-sansLight mx-auto mt-3">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna
        </p>
      </section>
      <section className="mb-10">
        <div className="flex flex-col md:flex-row max-w-[1080px] justify-evenly mx-auto items-center mt-5">
          {dummyData.map((data) => (
            <div
              key={data.id}
              className="flex shadow-sm py-10  flex-col items-center mt-5 md:mt-0 md:mx-5 w-[100%] h-auto "
              style={{
                boxShadow: "0 0 5px #008282",
              }}
            >
              <img src={data.logo} alt="" className="w-10 h-10" />
              <h2 className="text-center font-sansSemibold text-[20px] mt-2 ">
                {data.title}
              </h2>
              {data.id === 1 ? (
                <>
                  <iframe
                    src={data.iframe}
                    className="w-[90%] h-[50px] mt-2"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe>
                </>
              ) : (
                <>
                  <h2 className="text-center font-sansSemibold text-[15px] mt-2 ">
                    {data.text}
                  </h2>
                  <h2 className="text-center font-sansSemibold text-[15px] mt-2 ">
                    {data.text1}
                  </h2>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ContactUs;
