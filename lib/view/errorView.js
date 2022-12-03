export const makeError = ({ message, code }) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

export const handleError = (error, res) => {
  if (error.code < 100 || error.code > 599)
    console.error(`UNEXPECTED ERROR OCCURED:\n`, error);
  else
    console.log(
      `SENDING ERROR TO CLIENT:\n`,
      `     code:  ${error.code}\n`,
      `  message:  ${error.message}`
    );

  res.status(error.code ?? 500).end(error.message ?? "Server Error.");
};

export default makeError;
