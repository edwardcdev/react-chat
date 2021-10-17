export const loginFormValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const registerFormValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Length should be greater than 5';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (!!values.password && !!values.confirmPassword && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password does not match';
  }
  return errors;
};

export const workspaceFormValidate = (values) => {
  const errors = {};
  if (!values.adminEmail) {
    errors.adminEmail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.adminEmail)) {
    errors.adminEmail = 'Invalid email address';
  }
  if (!values.adminPassword) {
    errors.adminPassword = 'Required';
  } else if (values.adminPassword.length < 6) {
    errors.adminPassword = 'Length should be greater than 5';
  }
  if (!values.adminPasswordConfirm) {
    errors.adminPasswordConfirm = 'Required';
  }
  if (!!values.adminPassword && !!values.adminPasswordConfirm && values.adminPassword !== values.adminPasswordConfirm) {
    errors.adminPasswordConfirm = 'Password does not match';
  }
  if (!values.fullName) {
    errors.fullName = 'Required';
  }
  if (!values.displayName) {
    errors.displayName = 'Required';
  }
  return errors;
};

export const confirmEmailValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}
