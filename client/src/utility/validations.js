export const validate = (values) => {
  let errors = {};

  // Validate first name
  if (!values.firstName) {
    errors.firstName = "First name is required";
  } else if (!/^[a-zA-Z ]+$/.test(values.firstName)) {
    errors.firstName = "Invalid characters used";
  }

  // Validate last name
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  } else if (!/^[a-zA-Z ]+$/.test(values.lastName)) {
    errors.lastName = "Invalid characters used";
  }

  // Validate email
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  // Validate password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
};
