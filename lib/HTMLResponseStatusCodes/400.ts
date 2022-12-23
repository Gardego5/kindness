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
    message = "Bad Request.";
  }

  export class UNAUTHORIZED_401 extends HTMLClientError {
    readonly code = 401;
    message = "Unauthorized.";
  }

  export class NO_AUTH_TOKEN_401 extends UNAUTHORIZED_401 {
    message = "Authentication token is invalid, please log in.";
  }

  export class FORBIDDEN_403 extends HTMLClientError {
    readonly code = 403;
    message = "Forbidden.";
  }

  export class ADMIN_ROLE_REQUIRED_403 extends FORBIDDEN_403 {
    message = "You must be an administrator.";
  }

  export class NOT_FOUND_404 extends HTMLClientError {
    readonly code = 404;
    message = "Not Found.";
  }

  export class PROJECT_DOESNT_EXIST_404 extends NOT_FOUND_404 {
    message = "This project doesn't exist or you aren't a part of it.";
  }

  export class METHOD_NOT_ALLOWED_405 extends HTMLClientError {
    readonly code = 405;
    message = "Method Not Allowed.";
  }

  export class CONFLICT_409 extends HTMLClientError {
    readonly code = 409;
    message = "Conflict.";
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
        `Missing required query param "${key}".`
      );
  });
};

export default HTMLClientError;
