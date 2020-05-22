export const userLoginRequest = () => {
  return {
    type: "USER_LOGIN_REQUEST",
  };
};

export const userLoginSuccess = (user) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    payload: user,
  };
};

export const userLoginFailure = (err) => {
  return {
    type: "USER_LOGIN_FAILURE",
    payload: err && err.message ? err.message : err,
  };
};

export const sendEmailLinkRequest = () => {
  return {
    type: "SEND_EMAIL_LINK_REQUEST",
  };
};

export const sendEmailLinkSuccess = () => {
  return {
    type: "SEND_EMAIL_LINK_SUCCESS",
  };
};

export const sendEmailLinkFailure = (err) => {
  return {
    type: "SEND_EMAIL_LINK_FAILURE",
    payload: err && err.message ? err.message : err,
  };
};
