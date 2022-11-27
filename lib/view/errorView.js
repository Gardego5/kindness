const makeError = ({ message, code }) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

export default makeError;