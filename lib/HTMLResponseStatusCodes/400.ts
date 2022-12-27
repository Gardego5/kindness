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

export default HTMLClientError;
