import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.string()
                .email(),
    password: z.string()
                .min(4,{message: "Password must be at least 4 characters long."})
                .max(15,{message: "Password can be at most 15 characters long."}),
    name: z.string()
                .min(2,{message: "Name must be at least 2 characters long."})
})

export const SigninSchema = z.object({
    email: z.string()
                .email(),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    name: z.string()
                .min(3)
                .max(10)
})

export interface user {
    name: string;
    email: string;
    password: string;
}

export type role = "admin" | "user" | "guest";

