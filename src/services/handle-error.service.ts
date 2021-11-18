import { Response } from "express";
import { RequestError } from "./errors";

export function handleError(res: Response, error: unknown) {
    if (error instanceof RequestError) {
        res.status(error.status).json({ message: error.message });
    } else {
        res.status(500).json({ message: 'Unhandled error on server' });
    }
}