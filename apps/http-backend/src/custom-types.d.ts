interface AuthUser {
    username: string;
    password: string;
}

declare namespace Express {
    export interface Request {
        user?: AuthUser;
    }
}