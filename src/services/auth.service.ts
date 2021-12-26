import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWY_SECRET_KEY } from '../common/config';

export interface JWTPayload {
    id: string;
    login: string;
}

const expTime = 1000 * 60 * 60 * 24; // 1 day
const tokenField = 'token';


function createJWT(payload: JWTPayload, jwtOptions: jwt.SignOptions = { expiresIn: expTime / 1000 }): string {
    return jwt.sign(payload, JWY_SECRET_KEY, jwtOptions);
}

function decodeJWT(token: string): JWTPayload | undefined {
    let payload;
    jwt.verify(token, JWY_SECRET_KEY, (err, decoded) => {
        if (!err) payload = decoded;
    });
    return payload;
}


export function createUserToken(res: Response, payload: JWTPayload): void {
    const token = createJWT(payload, { expiresIn: expTime / 1000 });

    res.cookie(tokenField, token, {
        expires: new Date(Date.now() + expTime),
        httpOnly: true,
        sameSite: true
    });
}

export function authOnly(req: Request, res: Response, next: NextFunction): void {
    const tokenPayload = decodeJWT(req.cookies[tokenField]);
    
    if (tokenPayload) {
        // Valid token
        next();
    } else {
        // Invalid token
        res.sendStatus(401);
    } 
}

