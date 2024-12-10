import { Request, Response, NextFunction } from "express";

import { CustomError } from "@shared/exceptions";

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
