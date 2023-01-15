import { NextApiRequest } from "next";
import HTMLError from "./HTMLError";

namespace HTMLClientError {
  export abstract class HTMLClientError extends HTMLError {
    log() {
      console.log(`
====  SENDING ERROR TO CLIENT  ====
      CODE:     ${this.code}
      MESSAGE:  ${this.message}`);
    }
  }

  export class BAD_REQUEST_400 extends HTMLClientError {
    readonly code = 400;
    constructor(message = "Bad Request.") {
      super(message);
    }
  }

  export class UNAUTHORIZED_401 extends HTMLClientError {
    readonly code = 401;
    constructor(message = "Unauthorized.") {
      super(message);
    }
  }

  export class NO_AUTH_TOKEN_401 extends UNAUTHORIZED_401 {
    constructor(message = "Authentication token is invalid, please log in.") {
      super(message);
    }
  }

  export class FORBIDDEN_403 extends HTMLClientError {
    readonly code = 403;
    constructor(message = "Forbidden.") {
      super(message);
    }
  }

  export class ADMIN_ROLE_REQUIRED_403 extends FORBIDDEN_403 {
    constructor(message = "You must be an administrator.") {
      super(message);
    }
  }

  export class NOT_FOUND_404 extends HTMLClientError {
    readonly code = 404;
    constructor(message = "Not Found.") {
      super(message);
    }
  }

  export class PROJECT_DOESNT_EXIST_404 extends NOT_FOUND_404 {
    constructor(
      message = "This project doesn't exist or you aren't a part of it."
    ) {
      super(message);
    }
  }

  export class METHOD_NOT_ALLOWED_405 extends HTMLClientError {
    readonly code = 405;
    constructor(message = "Method Not Allowed.") {
      super(message);
    }
  }

  export class CONFLICT_409 extends HTMLClientError {
    readonly code = 409;
    constructor(message = "Conflict.") {
      super(message);
    }
  }

  export class BAD_RECAPTCHA_422 extends HTMLClientError {
    readonly code = 422;
    constructor(message = "You must complete the reCAPTCHA.") {
      super(message);
    }
  }

  export class MISSING_RECAPTCHA_400 extends BAD_REQUEST_400 {
    constructor(message = "You must include a `recaptcha` token in the body.") {
      super(message);
    }
  }
}

/**
 * Throws a {@link HTMLClientError.BAD_REQUEST_400 400 Bad Request} if any of
 * the query parameters are undefined.
 *
 * @param params an object with query parameters that should be defined.
 */
export const validateQueryParamsExist = (params: object) => {
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "undefined")
      throw new HTMLClientError.BAD_REQUEST_400(
        `Bad Request: Missing required query param "${key}".`
      );
  });
};

/**
 * Throws a {@link HTMLClientError.BAD_REQUEST_400 400 Bad Request} if any of
 * the body keys are missing.
 *
 * @param params a portion of a body that is required
 */
export const validateObjectsInBody = (params: object) => {
  Object.entries(params).forEach(([key, value]) => {
    console.log(`${key}: <${value}>`);
    if (typeof value === "undefined")
      throw new HTMLClientError.BAD_REQUEST_400(
        `Bad Request: Missing required field in body "${key}".`
      );
  });
};

/**
 * This validates that there is a `recaptcha` field in the body of a request,
 * and that the recaptcha is valid.
 *
 * @param req the request to validate.
 */
export async function validateReCAPTCHA(req: NextApiRequest) {
  if (typeof req.body.recaptcha === "undefined")
    throw new HTMLClientError.MISSING_RECAPTCHA_400();

  const reCAPTCHAResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify` +
      `?secret=${process.env.RECAPTCHA_SECRET}` +
      `&response=${req.body.recaptcha}`,
    { method: "POST" }
  );

  if (reCAPTCHAResponse.status !== 200)
    throw new HTMLClientError.BAD_RECAPTCHA_422();
}

export default HTMLClientError;
