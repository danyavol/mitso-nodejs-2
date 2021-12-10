import { Request, Response } from "express";
import { logger } from "../middlewares";
import { RequestError } from "./errors";

export function handleError(error: unknown, req: Request, res: Response): void {
    const requestInfo = `
    ${new Date().toLocaleString()}
    ${req.method} - ${req.baseUrl + req.url}
    body:    ${JSON.stringify(req.body)}
    query:   ${JSON.stringify(req.query)}
    params:  ${JSON.stringify(req.params)}
    `;
    if (error instanceof RequestError) {
        const { message } = error;
        res.status(error.status).json({ message });
        logger.log('error', message);
    } else {
        const message = 'Unhandled error on server';
        res.status(500).json({ message });
        logger.log('error', message + requestInfo);
    }
}