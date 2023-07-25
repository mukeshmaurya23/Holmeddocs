import React, { useState } from "react";
import { Footeritems } from "../constant";
import addIcon from "../images/icons/Add.png";
import { Link } from "react-router-dom";
//import minusIcon from "../images/icons/Minus.png";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(1);

  const handleItemClick = (id) => {
    setIsVisible((prevIsVisible) => (prevIsVisible === id ? null : id));
    console.log(id);
  };

  return (
    <>
      <div className="bg-greenMain  text-black lg:pt-16 pt-8 tracking-[0.1rem] ">
        <div className="hidden   lg:flex lg:justify-between space-x-2 lg:px-16 xl:px-20">
          <section>
            <ul>
              <li className="mb-10">
                <section>
                  <ul className="font-sansRegular space-y-5 cursor-pointer">
                    <h6 className="white font-sansRegular font-semibold mb-8 text-footerHeader">
                      Holmeddoc
                    </h6>
                    <li className="hidden sm:block font-semibold font-sansRegular text-sm text-[11px] text-black">
                      Home
                    </li>
                    <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                      About us
                    </li>
                  </ul>
                </section>
              </li>
              <li>
                <section>
                  <ul className="font-sansRegular space-y-5 cursor-pointer">
                    <Link
                      to="/contact-us"
                      className="white font-sansRegular font-semibold mb-8 text-footerHeader"
                    >
                      Contact Us
                    </Link>
                    <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                      info@holmeddoc.com
                    </li>
                    <li className=" hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                      +1 000 000 0000
                    </li>
                  </ul>
                </section>
              </li>
            </ul>
          </section>
          <section>
            <ul className="font-sansRegular space-y-5 cursor-pointer">
              <h2 className="white font-sansRegular font-semibold mb-8 text-footerHeader">
                Insurance Providers
              </h2>
              <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                UHC
              </li>
              <li className=" hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                Humana
              </li>
              <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                Aetna
              </li>
            </ul>
          </section>
          <section>
            <ul className="font-sansRegular space-y-5 cursor-pointer">
              <h2 className="white font-sansRegular font-semibold mb-8 text-footerHeader">
                Major Specialities
              </h2>
              <li className="hidden sm:block  cursor-pointer font-semibold font-sansRegular text-sm text-[11px] text-black">
                Acupuncture
              </li>
              <li className="hidden sm:block  font-semibold   font-sansRegular text-sm text-[11px] text-black">
                Aromatherapy{" "}
              </li>
              <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                Alternative Medicine
              </li>
              <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                Yoga
              </li>
              <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                {" "}
                Reiki
              </li>
              <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px]  text-black">
                {" "}
                Holistic Medicine
              </li>
              <Link to="/specialist">
                <li className=" font-semibold font-sansRegular text-sm text-[11px] pt-3 text-black underline">
                  View All
                </li>
              </Link>
            </ul>
          </section>
          <section>
            <ul className="font-sansRegular space-y-5">
              <h2 className="white font-sansRegular font-semibold mb-8 text-footerHeader cursor-pointer">
                For Doctor and Healthcare providers
              </h2>
              <li className="hidden sm:block  cursor-pointer font-semibold font-sansRegular text-sm text-[11px] text-black">
                Sign up with Holmeddoc
              </li>
              <li className=" hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                For Developer Teams
              </li>
              <li className="hidden sm:block  font-semibold font-sansRegular text-sm text-[11px] text-black">
                Get the Holmeddoc App
              </li>
              <li>
                <div className="md:my-8 lg:my-4 flex items-center md:justify-start my-6  md:w-72 w-80 ">
                  <img
                    className="mr-4  w-[35%] h-auto"
                    alt="appstore"
                    src="https://www.pngmart.com/files/10/Download-On-The-App-Store-PNG-Image.png"
                  />
                  <img
                    className=" mr-2 w-[40%] h-[40%]"
                    alt="playstore"
                    src="https://e7.pngegg.com/pngimages/918/845/png-clipart-google-play-logo-google-play-app-store-android-google-play-text-logo.png"
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
        {/**Mobile Footer */}
        <div className="block lg:hidden">
          <section>
            <ul>
              <li className="mb-10 p-3">
                <section>
                  {Footeritems.map((item, index) => {
                    return (
                      <>
                        <ul className="font-sansRegular py-5 " key={item.id}>
                          <div className="flex justify-between mr-6">
                            <h6 className="white font-sansRegular font-semibold text-footerHeader text-[12px]">
                              {item.title}
                            </h6>

                            <i
                              className={`${
                                isVisible === item.id
                                  ? "fa fa-minus"
                                  : "fa fa-plus"
                              } text-[16px] cursor-pointer`}
                              aria-hidden="true"
                              onClick={() => handleItemClick(item.id)}
                            ></i>
                          </div>
                          {isVisible === item.id && (
                            <ul>
                              {item.list.map((data) => {
                                const isViewAll = data.id === "viewall";
                                const linkStyle = isViewAll ? "underline" : "";

                                return (
                                  <li
                                    key={data.id}
                                    className={`text-[13px] mt-3 ${linkStyle}`}
                                  >
                                    {isViewAll ? (
                                      <a href="/specialist" className="">
                                        {data.title}
                                      </a>
                                    ) : (
                                      data.title
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </ul>
                      </>
                    );
                  })}
                </section>
              </li>
            </ul>
          </section>
        </div>
        <p className=" px-20 py-10 text-gray-600 leading-6 font-sansRegular font-semibold text-[14px] hidden sm:block md:block lg:block xl:block 2xl:block">
          The content provided here or elsewhere on the Holmeddoc website,
          mobile application, newsletters or similar communication is provided
          for general informational purpose only. Holmeddoc Inc does not provide
          any medical advice, diagnose or treatment of any kind. Always contact
          your doctor or healthcare service provider directly regarding any
          issues, questions or doubts pretaining to your healthcare or
          medication.
        </p>
        <div>
          <div className="bg-transparent flex justify-center items-center pt-8 md:py-0">
            <img
              className="bg-transparent h-[7rem] md:h-[8rem] xl:h-[8.5rem] mb-2 cursor-pointer"
              src={require("../images/home/Footer.png")}
            />
          </div>
          <div className="flex px-6 sm:px-8 py-4 lg:pb-10 justify-center items-center">
            <div
              xs="12"
              lg="8"
              className="flex flex-col lg:flex-row  lg:items-center"
            >
              <ul className="flex flex-col items-center md:flex-row md:space-x-4 lg:space-x-8 text-sm font-light  md:font-medium text-size-4 md:text-[14px]  text-gray-900">
                <li className="cursor-pointer">
                  <a href="#">Our Terms</a>
                </li>
                <li className="cursor-pointer">
                  <a href="#">Our Privacy Policy</a>
                </li>
                <li className="cursor-pointer">
                  <a href="#">User Agreement</a>
                </li>
              </ul>
            </div>
            <div
              lg="4"
              class="hidden lg:flex justify-end absolute lg:right-10 xl:right-16"
            >
              <ul class=" flex flex-row ">
                <li class="mr-2 p-[4px]  border-black border-[1px] rounded-full cursor-pointer">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.2"
                    baseProfile="tiny"
                    viewBox="0 0 24 24"
                    class="shared-class"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 10h3v3h-3v7h-3v-7h-3v-3h3v-1.255c0-1.189.374-2.691 1.118-3.512.744-.823 1.673-1.233 2.786-1.233h2.096v3h-2.1c-.498 0-.9.402-.9.899v2.101z"></path>
                  </svg>
                </li>
                <li class="mr-2 p-[4px]  border-black border-[1px] rounded-full cursor-pointer">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    class="shared-class"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path>
                  </svg>
                </li>
                <li class="mr-2 p-[4px]  border-black border-[1px] rounded-full cursor-pointer">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.2"
                    baseProfile="tiny"
                    viewBox="0 0 24 24"
                    class="shared-class"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.89 7.012c.808-.496 1.343-1.173 1.605-2.034-.786.417-1.569.703-2.351.861-.703-.756-1.593-1.14-2.66-1.14-1.043 0-1.924.366-2.643 1.078-.715.717-1.076 1.588-1.076 2.605 0 .309.039.585.117.819-3.076-.105-5.622-1.381-7.628-3.837-.34.601-.51 1.213-.51 1.846 0 1.301.549 2.332 1.645 3.089-.625-.053-1.176-.211-1.645-.47 0 .929.273 1.705.82 2.388.549.676 1.254 1.107 2.115 1.291-.312.08-.641.118-.979.118-.312 0-.533-.026-.664-.083.23.757.664 1.371 1.291 1.841.625.472 1.344.721 2.152.743-1.332 1.045-2.855 1.562-4.578 1.562-.422 0-.721-.006-.902-.038 1.697 1.102 3.586 1.649 5.676 1.649 2.139 0 4.029-.542 5.674-1.626 1.645-1.078 2.859-2.408 3.639-3.974.784-1.564 1.172-3.192 1.172-4.892v-.468c.758-.57 1.371-1.212 1.84-1.921-.68.293-1.383.492-2.11.593z"></path>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
