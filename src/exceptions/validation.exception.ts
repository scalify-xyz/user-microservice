import { CustomError } from ".";

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(400, message);
    }
}