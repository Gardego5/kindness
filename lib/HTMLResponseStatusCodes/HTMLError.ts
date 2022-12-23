abstract class HTMLError extends Error implements HTMLResponseStatusCode {
  abstract readonly code: number;

  abstract log(): void;
}

export default HTMLError;
