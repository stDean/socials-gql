export const validateRegisterInput = ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else {
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== confirmPassword) {
    errors.password = "Password don't match, try again!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = ({ email, password }) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  }

  if (password === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
