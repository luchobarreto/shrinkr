import { SESSION_NAME } from "./config"
import { Unauthorized } from "./errors";

export const isLoggedIn = (req: any, throwError: boolean = false, message?: string) => {
    if(req.session.userId) {
        if(throwError) throw new Unauthorized(message);
        return true;
    } else {
        return false;
    }
};

export const logIn = (req: any, userId: string) => {
    req.session!.userId = userId;
    req.session!.createdAt = Date.now();
}

export const logOut = (req: any, res: any) => 
    new Promise((resolve: any, reject) => {
        req.session!.destroy((err: Error) => {
            if(err) reject(err);
            
            res.clearCookie(SESSION_NAME);
            resolve();
        });
    });