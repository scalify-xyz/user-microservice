import { CustomError } from ".";

export class InternalServerError extends CustomError {
    constructor(message: string) {
        super(500, message);
    }
}
