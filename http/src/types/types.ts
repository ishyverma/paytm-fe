import { z } from "zod"

export const signupType = z.object({
    username: z.string(),
    firstName: z.string().min(3, "Min length of firstname should be 3").max(30, "Max length of firstname should be 30"),
    lastName: z.string().min(3, "Min length of lastname should be 3").max(30, "Max length of lastname should be 30"),
    password: z.string().min(6, "Min length of password should be 6")
})

export const signinType = z.object({
    username: z.string(),
    password: z.string()
})

export const updateUser = z.object({
    password: z.string().min(6, "Min length of password should be 6").optional(),
    firstName: z.string().min(3, "Min length of firstname should be 3").max(30, "Max length of firstname should be 30").optional(),
    lastName: z.string().min(3, "Min length of lastname should be 3").max(30, "Max length of lastname should be 30").optional()
})

export const transferMoney = z.object({
    to: z.number(),
    amount: z.number()
})

declare global{
    namespace Express {
        interface Request {
            userId: number;
        }
    }
}