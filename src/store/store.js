import { configureStore } from "@reduxjs/toolkit";
import mobileAppSlice from "./mobileAppSlice";
const store = configureStore({
  reducer: {
    mobileApp: mobileAppSlice,
  },
});

export default store;

/**  {isMenuOpen && (
            <div
              className={`fixed top-0 right-0 w-screen h-screen bg-white z-10 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="relative">
                <button
                  onClick={toggleMenuHandler}
                  className="absolute top-0 right-0 m-4 text-black"
                >
                  X
                </button>
                <div className="p-4">
                
                  Hello
                </div>
              </div>
            </div>
          )} */
