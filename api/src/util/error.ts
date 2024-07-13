export type ErrorResponse = {
  ok: boolean;
  status: number;
  error?: Error | unknown;
  message?: string;
};

// Utility function to create error objects
export const respondWithError = ({
  status,
  error,
  message,
}: {
  status: number;
  error?: Error | unknown;
  message?: string;
}): ErrorResponse => {
  return { ok: false, status, error, message };
};

export enum ErrorCodes {
  NOT_FOUND_ERROR = 404,
  BAD_REQUEST_ERROR = 400,
  INTERNAL_ERROR = 500,
  UNAUTHORIZED_ERROR = 401,
}
