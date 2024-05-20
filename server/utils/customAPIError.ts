const DefaultErrorMessages = {
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "You are not authorized to access this resource",
  FORBIDDEN: "You are forbidden from accessing this resource",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service unavailable",
};

export class CustomAPIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

export class BadRequestError extends CustomAPIError {
  constructor(message: string = DefaultErrorMessages.BAD_REQUEST) {
    super(message, HTTPStatusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string = DefaultErrorMessages.UNAUTHORIZED) {
    super(message, HTTPStatusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends CustomAPIError {
  constructor(message: string = DefaultErrorMessages.FORBIDDEN) {
    super(message, HTTPStatusCodes.FORBIDDEN);
  }
}

export class NotFoundError extends CustomAPIError {
  constructor(message: string = DefaultErrorMessages.NOT_FOUND) {
    super(message, HTTPStatusCodes.NOT_FOUND);
  }
}

export class InternalServerError extends CustomAPIError {
  constructor(message: string = DefaultErrorMessages.INTERNAL_SERVER_ERROR) {
    super(message, HTTPStatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export class ServiceUnavailableError extends CustomAPIError {
  constructor(message: string = DefaultErrorMessages.SERVICE_UNAVAILABLE) {
    super(message, HTTPStatusCodes.SERVICE_UNAVAILABLE);
  }
}
