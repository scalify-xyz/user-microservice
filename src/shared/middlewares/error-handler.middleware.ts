import {
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "@main/api/express/routes/interfaces/route.interface";

export const ErrorHandlerMiddleware = (
  err: Error,
  _: TExpressRequest,
  response: TExpressResponse,
  __: TExpressNext,
): void => {
  console.error(err);
  response.status(500).json({ message: "Internal Server Error" });
};
