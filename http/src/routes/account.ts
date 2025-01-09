import { Request, Response, Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../lib/middleware";
import { transferMoney } from "../types/types";

export const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId
    const balance = await prisma.account.findFirst({
        where: {
            userId
        }
    })
    if(!balance) {
        res.status(404).json({
            message: "Account not found"
        })
        return
    }
    res.json({
        balance: balance.balance
    })
})

accountRouter.post("/transfer", async (req: Request, res: Response) => {
    const parsedData = transferMoney.safeParse(req.body)
    if(!parsedData.success) {
        res.status(404).json({
            message: "Wrong data sent by the user"
        })
        return
    }

    const { to, amount } = parsedData.data

    try {
        const userSending = await prisma.account.findFirst({
            where: {
                userId: req.userId
            }
        })

        if(!userSending || userSending.balance < amount) {
            res.status(400).json({
                message: "Insufficient balance"
            })
            return
        }

        const [reciever, sender] = await prisma.$transaction([
            prisma.account.update({
                where: {
                    userId: to,
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            }),
            prisma.account.update({
                where: {
                    id: req.userId
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            })
        ])
        res.json({
            message: "Transfer successful"
        })
    } catch (e) {
        res.status(411).json({
            message: "Invalid account"
        })
    }
})