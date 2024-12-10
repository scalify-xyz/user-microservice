import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export const ErrorHandlerMiddleware = (
    err: CustomError,
    _: Request,
    res: Response,
    __: NextFunction,
): void => {
    console.error(err);

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }

    res.status(500).json({ message: "Internal Server Error" });
};
