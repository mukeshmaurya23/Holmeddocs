import React from "react";
import Input from "../../util/Input";
import Label from "../../util/Label";

const Step1Forgot = ({ formik }) => {
  // const formik = useFormik({
  //   initialValues: {
  //     mobileNumber: "",
  //   },
  //   validationSchema: loginSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });
  const { touched, errors, values } = formik;
  return (
    <>
      <div className="flex flex-col px-3 sm:px-14 py-3">
        <p className="font-sansRegular text-[#292F33] font-semibold text-2xl tracking-[3px] mb-2 px-5">
          Forgot your password?
        </p>
        <p className="font-sansRegular text-sm text-[#545871] py-2 px-5 mt-3">
          Don’t worry, we will help you to reset.
        </p>

        <div className="px-5 py-2">
          <div className="mx-4 p-4 max-w-[500px]">
            <div className="flex items-center justify-center">
              <div className="flex items-center text-white relative">
                <div className="rounded-full transition duration-500 ease-in-out h-10 w-10 py-3 border-2 bg-verifiCation border-verifiCation flex items-center justify-center">
                  <p className="text-center">1</p>
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs  font-sansBold text-[#757993]">
                  Mobile Number
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-verifiCation"></div>
              <div className="flex items-center text-verifiCation relative">
                <div className="rounded-full transition duration-500 ease-in-out h-10 w-10 py-3 border-2  border-verifiCation flex items-center justify-center">
                  2
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium font-sansRegular  text-[#757993]">
                  OTP Verification
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-verifiCation"></div>
              <div className="flex items-center text-verifiCation relative">
                <div className="rounded-full transition duration-500 ease-in-out h-10 w-10 py-3 border-2 border-verifiCation flex items-center justify-center">
                  3
                </div>
                <div className="absolute font-sansRegular top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium  text-[#757993]">
                  Reset Password
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[500px] mt-10 mx-8">
          <div className="flex flex-col space-y-2 w-10/12 py-0 relative">
            <Label
              htmlFor="mobileNumber"
              className="font-sansRegular text-[#757993] text-xs"
            >
              Mobile Number
            </Label>
            <div className="absolute left-0 top-[1.5rem] w-3 pl-2  h-full text-md text-formLabel">
              +1
            </div>
            <Input
              type="number"
              name="mobileNumber"
              id="mobileNumber"
              onChange={formik.handleChange}
              value={values.mobileNumber}
              onBlur={formik.handleBlur}
              placeholder="XXX XXX XXXX"
              className="border border-verifiCation text-formLabel rounded-md py-2 px-8 outline-none focus:border-verifiCation"
            />
            <div className="text-red-600 text-xs ml-1">
              {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                formik.errors.mobileNumber
              ) : (
                <>&nbsp;</>
              )}
            </div>
          </div>
          <div className="max-w-[340px]">
            <p className="font-sansRegular text-xs text-[#757993] py-5 mt-2">
              Please Note , You would receive an OTP to verify the mobile
              number.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1Forgot;
