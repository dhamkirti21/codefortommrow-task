import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey:any = "SECRET";
console.log("secret",secretKey);

export function generateToken(payload: any): string {
    return jwt.sign(payload, secretKey,{
        expiresIn: '12h'
    });
}

export function generateResetToken(payload: any): string {
    return jwt.sign(payload, secretKey,{
        expiresIn: '5m'
    });
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
}


export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }
    
    const user = verifyToken(token);
    if (!user) {
        return res.sendStatus(403);
    }
    (req as any).user = user;
    next();
}
