import { NextFunction, Request, Response } from "express";

import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

export const loggerMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const message = `Incoming Request
    ${new Date().toLocaleString()}
    ${req.method} - ${req.baseUrl + req.url}
    body:    ${JSON.stringify(req.body)}
    query:   ${JSON.stringify(req.query)}
    params:  ${JSON.stringify(req.params)}
    `;

    logger.log('info', message);
    next();
};