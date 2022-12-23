import HTMLError from "@lib/HTMLResponseStatusCodes/HTMLError";
import { NextApiResponse } from "next";

const apiErrorHandler = (error: Error, res: NextApiResponse) => {
  const isKnownError = error instanceof HTMLError;

  if (isKnownError) error.log();
  else console.error(`UNEXPECTED ERROR OCCURED:\n`, error);

  const code = isKnownError ? error.code : 500;
  const message = isKnownError ? error.message : "Server Error.";

  res.status(code).end(message);
};

export default apiErrorHandler;
