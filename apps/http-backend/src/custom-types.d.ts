interface AuthUser {
    email: string;
    password: string;
}

declare namespace Express {
    export interface Request {
        user?: AuthUser
    }
}