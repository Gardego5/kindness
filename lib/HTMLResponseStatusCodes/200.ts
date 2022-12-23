export namespace HTMLSuccessful {
  export class OK_200 implements HTMLResponseStatusCode {
    readonly code = 200;
  }

  export class CREATED_201 implements HTMLResponseStatusCode {
    readonly code = 201;
  }

  export class ACCEPTED_202 implements HTMLResponseStatusCode {
    readonly code = 202;
  }

  export class NO_CONTENT_204 implements HTMLResponseStatusCode {
    readonly code = 204;
  }
}
