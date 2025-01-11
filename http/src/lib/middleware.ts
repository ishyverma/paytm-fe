import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    if (!header || !header.startsWith("Bearer")) {
        res.status(403).json({
            message: "Not signed in"
        })
        return
    }
    const token = header.split(" ")[1];
    try {
        const userInfo = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }
        req.userId = userInfo.userId;
        next();
    } catch (e) {
        res.status(403).json({
            message: "Error happened"
        })
        return
    }
}

