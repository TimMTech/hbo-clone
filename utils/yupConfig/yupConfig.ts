import * as Yup from "yup";

export const signinValidation = Yup.object().shape({
  email: Yup.string()
    .required("Enter a valid email.")
    .email(
      `Email must have ${"@"} and end with ${"[.com, .net, .gov, etc]"} .`
    ),
  password: Yup.string()
    .required("Enter a valid password.")
    .min(6, "Password must be 6 characters or more."),
});

export const signupValidation = Yup.object().shape({
  firstName: Yup.string().required("Enter your first name."),
  lastName: Yup.string().required("Enter your last name."),
  email: Yup.string()
    .required("Enter a valid email.")
    .email(
      `Email must have ${"@"} and end with ${"[.com, .net, .gov, etc]"} .`
    ),
  password: Yup.string()
    .required("Enter a valid password.")
    .min(6, "Password must be 6 characters or more."),
});

export const billingValidation = Yup.object().shape({
  cardName: Yup.string().required("Enter the name on your card."),
  cardNumber: Yup.string().required("Enter the card number"),
  exp: Yup.string().required("Enter expiration date."),
  securityCode: Yup.string().required(
    "Enter the 3 digit code the back of your card."
  ),
  zipCode: Yup.string().required("Enter your zipcode."),
  stateOrTerritory: Yup.string().required("Enter your state/residence."),
});

export const recoveryValidation = Yup.object().shape({
  email: Yup.string()
    .required("Enter a valid email.")
    .email(
      `Email must have ${"@"} and end with ${"[.com, .net, .gov, etc]"} .`
    ),
});

export const newPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .required("Enter a valid password.")
    .min(6, "Password must be 6 characters or more."),
});

export const settingsEmailValidation = Yup.object().shape({
  email: Yup.string()
    .required("Enter a valid email.")
    .email(
      `Email must have ${"@"} and end with ${"[.com, .net, .gov, etc]"} .`
    ),
});

export const settingsPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .required("Enter a valid password.")
    .min(6, "Password must be 6 characters or more."),
});
