import * as Yup from "yup";

export const onboardingSchema = Yup.object().shape({
  profileImage: Yup.string(),
  bio: Yup.string().required("Bio is required"),
  interests: Yup.array().min(1, "Select at least one interest"),
  experience: Yup.string().required("Experience level is required"),
  goals: Yup.array().min(1, "Select at least one goal"),
  phoneNumber: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, "Please enter a valid phone number")
    .optional(),
  address: Yup.string().optional(),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .optional(),
});
