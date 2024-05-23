import type { EventHandler, EventHandlerRequest } from "h3";

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(handler: EventHandler<T, D>): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      // do something before the route handler

      const response = (await handler(event)) as { statusCode?: number } & D;

      // do something after the route handler
      const statusCode = (response?.statusCode || 200) as number;
      setResponseStatus(event, statusCode);
      return { ...response, statusCode };
    } catch (err) {
      let statusCode = 500;
      let message = "Something went wrong. Please try again.";

      if (err instanceof CustomAPIError) {
        statusCode = err.statusCode;
        message = err.message;
      } else if (err instanceof Error) {
        console.log("Error when signup:", err.message);
        // message = err.message;
      }

      setResponseStatus(event, statusCode);
      return { message, statusCode };
    }
  });
