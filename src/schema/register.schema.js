import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one number and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  state: Yup.string()
    .required("State is required")
    .min(2, "State must be at least 2 characters"),
  country: Yup.string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters"),
  phone: Yup.string()
    .required("Phone is required")
    .min(10, "Phone must be at least 10 characters"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  gender: Yup.string()
    .required("Gender is required")
    .min(2, "Gender must be at least 2 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(2, "Address must be at least 2 characters"),
});
