export class RequestError extends Error {
    public status: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.status = statusCode;
    }
}