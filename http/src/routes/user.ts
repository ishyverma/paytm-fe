import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signinType, signupType, updateUser } from "../types/types";
import { prisma } from "../lib/prisma";
import { JWT_SECRET } from "../config";
import { authMiddleware } from "../lib/middleware";

export const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
    const parsedData = signupType.safeParse(req.body);
    if(!parsedData.success) {
        res.status(404).json({
            message: "Wrong data sent by the user"
        })
        return
    }
    const { username, firstName, lastName, password } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                firstName,
                lastName,
                password: hashedPassword
            }
        })
        res.json({
            message: "User created successfully",
            userId: user.id
        })
    } catch (e) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
})

userRouter.post("/signin", async (req: Request, res: Response) => {
    const parsedData = signinType.safeParse(req.body);
    if(!parsedData.success) {
        res.status(404).json({
            message: "Wrong data sent by the user"
        })
        return
    }
    const { username, password } = parsedData.data
    try {
        const user = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if(!user) {
            res.status(404).json({
                message: "User not exists"
            })
            return
        }

        const hashedPassword = await bcrypt.compare(password, user?.password)
        if(!hashedPassword) {
            res.status(404).json({
                message: "Password is incorrect"
            })
            return
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET)
        res.json({
            token
        })
    } catch (e) {
        res.status(411).json({
            message: "Error while logging in"
        })
    }
})

userRouter.put("/", authMiddleware, async (req: Request, res: Response) => {
    const parsedData = updateUser.safeParse(req.body);
    if(!parsedData.success) {
        res.status(404).json({
            message: "Wrong data sent by the user"
        })
        return
    }
    const { password, firstName, lastName } = parsedData.data
    const userId = req.userId
    const hashedPassword = await bcrypt.hash(password as string, 5)
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword,
                firstName,
                lastName
            }
        })
        res.json({
            message: "Updated successfully"
        })
    } catch (e) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
})

userRouter.get("/bulk", async (req: Request, res: Response) => {
    const { filter } = req.query;
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    firstName: {
                        startsWith: filter as string
                    }
                },
                {
                    lastName: {
                        startsWith: filter as string
                    }
                }
            ]
        },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
        }
    })

    if(users.length == 0) {
        res.status(404).json({
            message: `No user found with name ${filter}`
        })
        return
    }

    res.json({
        users
    })

})