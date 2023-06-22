// import React from "react";
// import logo from "../images/home/Logo.png";
// import userLogo from "../images/home/User.png";
// const Navbar = () => {
//   return (
//     <>
//       <nav class="flex items-center justify-between px-9 py-8  shadow-md z-10">
//         <div class="flex items-center">
//           <ul class="flex gap-4 ml-4">
//             <li className="font-sansBold text-navText tracking-widest text-xs ">
//               MAKE AN APPOINTMENT
//             </li>
//             <div class=" h-3 border-l border-gray-400"></div>
//             <li className="font-sansBold text-navText tracking-widest text-xs">
//               BROWSE
//             </li>
//           </ul>
//         </div>

//         <div class="relative flex items-center justify-center">
//           <div class="absolute  -top-[48px] bottom-0 flex h-[10rem] w-[10rem] items-center justify-center rounded-full z-50  ">
//             <img
//               src={logo}
//               alt="Logo"
//               className=" h-[10rem] w-auto rounded-full"
//               style={{
//                 boxShadow: " 0 7px 6px -5px rgb(0 0 0 / 0.2)",
//               }}
//             />
//           </div>
//         </div>

//         <div className="flex items-center">
//           <ul className="flex gap-4 items-center">
//             <li className="uppercase font-sansBold text-navText tracking-widest text-xs">
//               about us
//             </li>
//             <div className="h-4 border-l border-gray-300"></div>
//             <li className="uppercase font-sansBold text-navText tracking-widest text-xs flex items-center">
//               Login/Signup{" "}
//               <img src={userLogo} alt="Logo" className="w-6 h-6 ml-2" />
//             </li>
//           </ul>
//         </div>
//       </nav>
//       {/* <div class="h-[70vh] bg-[#E2F6F3]">
//         <div className="bg-[#E2F6F3]">
//           <div className="text-center py-24">
//             <p>HOLISTIC MEDICINE CONNECTING</p>
//             <p>Mind. Body. Soul</p>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default Navbar;

import React from "react";
import logo from "../images/home/Logo.png";
import userLogo from "../images/home/User.png";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-9 py-4 md:py-8 shadow-md z-10">
        <div className="flex items-center">
          <ul className="flex gap-2 md:gap-4 ml-4">
            <li className="font-sansBold text-navText tracking-widest text-xs">
              MAKE AN APPOINTMENT
            </li>
            <div className="h-3 border-l border-gray-400"></div>
            <li className="font-sansBold text-navText tracking-widest text-xs">
              BROWSE
            </li>
          </ul>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute -top-[48px] bottom-0 flex h-[8rem] w-[8rem] md:h-[10rem] md:w-[10rem] items-center justify-center rounded-full z-50">
            <img
              src={logo}
              alt="Logo"
              className="h-[8rem] w-auto md:h-[10rem] rounded-full"
              style={{
                boxShadow: "0 7px 6px -5px rgb(0 0 0 / 0.2)",
              }}
            />
          </div>
        </div>

        <div className="flex items-center">
          <ul className="flex gap-2 md:gap-4 items-center">
            <li className="uppercase font-sansBold text-navText tracking-widest text-xs">
              about us
            </li>
            <div className="h-4 border-l border-gray-300"></div>
            <li className="uppercase font-sansBold text-navText tracking-widest text-xs flex items-center">
              Login/Signup{" "}
              <img src={userLogo} alt="Logo" className="w-6 h-6 ml-2" />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
