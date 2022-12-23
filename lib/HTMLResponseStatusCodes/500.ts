import HTMLError from "./HTMLError";

namespace HTMLServerError {
  export abstract class HTMLServerError extends HTMLError {
    log() {
      console.log(`
====  SENDING ERROR TO CLIENT  ====
      CODE:     ${this.code}
      MESSAGE:  ${this.message}
====        STACK TRACE        ====
${this.stack}`);
    }
  }

  export class INTERNAL_SERVER_ERROR_500 extends HTMLServerError {
    readonly code = 500;
    message = "Internal Server Error.";
  }
}

export default HTMLServerError;
