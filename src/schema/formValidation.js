import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  password: Yup.string().min(5).required("Please Enter your password"),

  checkbox: Yup.boolean()
    .oneOf([true], "Please accept the terms and conditions")
    .required("Please accept the terms and conditions"),
});

export const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First Name is required")
    .min(3, "First Name must be at least 3 characters")
    .matches(/^[a-zA-Z]+$/, "Must be only alphabets"),
  last_name: Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .matches(/^[a-zA-Z]+$/, "Must be only alphabets"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid email"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  dob: Yup.string()
    .required("Date of Birth is required")
    .matches(
      /^\d{4}\/\d{2}\/\d{2}$/,
      "Invalid Date of Birth. Please use the format YYYY/MM/DD"
    ),
  gender: Yup.string().required("Gender selection is required"),
});

export const forgotSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const resetSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old Password is required")
    .notOneOf(
      [Yup.ref("newPassword")],
      "Old Password cannot be the same as New Password"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),

  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});
