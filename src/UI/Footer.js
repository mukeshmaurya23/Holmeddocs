import React from "react";

const Footer = () => {
  return (
    <footer className="p-6 bg-greenMain font-sans dark:bg-gray-800 dark:text-gray-100">
      <div className="container grid grid-cols-1 mx-auto gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <h2 className="font-sansBold">Holmeddoc</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <a rel="noopener noreferrer" href="#">
              Home
            </a>
            <a rel="noopener noreferrer" href="#">
              About Us
            </a>
            <a rel="noopener noreferrer" href="#">
              Help
            </a>
            <h2 className="font-sansBold mt-[2rem]">Contact Us</h2>

            <a rel="noopener noreferrer" href="#">
              info@holmeddoc.com
            </a>
            <a rel="noopener noreferrer" href="#">
              +1 000 000 0000
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Insurance Providers</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <a rel="noopener noreferrer" href="#">
              UHC
            </a>
            <a rel="noopener noreferrer" href="#">
              Humana
            </a>
            <a rel="noopener noreferrer" href="#">
              Aetna
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-4 ">
          <h2 className="font-medium">Major Specialities</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <a rel="noopener noreferrer" href="#">
              Acupuncture
            </a>
            <a rel="noopener noreferrer" href="#">
              Atomatherapy
            </a>
            <a rel="noopener noreferrer" href="#">
              Alternative Medicine
            </a>
            <a rel="noopener noreferrer" href="#">
              Yoga
            </a>
            <a rel="noopener noreferrer" href="#">
              Reiki
            </a>
            <a rel="noopener noreferrer" href="#">
              Holistic Medicine
            </a>
            <a rel="noopener noreferrer" href="#" className="underline">
              View All
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">For Doctor and Healthcare providers</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <a rel="noopener noreferrer" href="#">
              Sign up with Holmeddoc
            </a>
            <a rel="noopener noreferrer" href="#">
              For Developer Teams
            </a>
            <a rel="noopener noreferrer" href="#">
              Get the Holmeddoc App
            </a>
            <div className="flex">
              <div className="flex  text-white rounded-md px-2">
                <div className="bg-unnamedColor flex rounded">
                  <img
                    src={require("../images/apple.png")}
                    alt="logo"
                    className="w-8 h-9"
                  />
                  <p>
                    DownLoad on the <br /> App Store
                  </p>
                </div>
                <div className="m-2 bg-unnamedColor flex">
                  <img
                    src={require("../images/playstore.png")}
                    alt="logo"
                    className="w-8 h-9 p-2"
                  />
                  <p>
                    Download it on <br /> Google Play
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="font-sansLight text-sm text-black container mx-auto mt-8 sm:mt-16 md:mt-">
          The content provided here or elsewhere on the Holmeddoc website,
          mobile application, newsletters or similar communication is provided
          for general informational purpose only. Holmeddoc Inc does not provide
          any medical advice, diagnose or treatment of any kind. Always contact
          your doctor or healthcare service provider directly regarding any
          issues, questions or doubts pertaining to your healthcare or
          medication
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-8 sm:py-12 text-sm">
        <img
          src={require("../images/home/Footer.png")}
          alt="logo"
          className="w-20 h-20"
        />
      </div>

      <div className="flex items-center justify-center px-6 text-sm">
        <ul className="flex py-2">
          <li>
            <a href="#" className="font-bahnschrift hover:text-gray-500 px-4">
              Our Terms
            </a>
          </li>
          <li>
            <a href="#" className="font-bahnschrift hover:text-gray-500 px-4">
              Our Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="font-bahnschrift hover:text-gray-500 px-4">
              Do Not Sell My Personal Information
            </a>
          </li>
          <li>
            <a href="#" className="font-bahnschrift hover:text-gray-500 px-4">
              Our Site Map
            </a>
          </li>

          <li className="rounded-full w-12 h-12 bg-black" />
          <li className="rounded-full w-12 h-12 bg-black mx-4" />
          <li className="rounded-full w-12 h-12 bg-black" />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
