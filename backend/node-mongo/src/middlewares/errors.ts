import { Request, Response, NextFunction } from "express"

export const catchAsync = (handler: any) => 
    (...args: [Request, Response, NextFunction]) => handler(...args).catch(args[2]);

export const serverError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(!err.statusCode) {
        console.error(err.stack);
    }
    res.status(err.statusCode || 500).json(err.statusCode ? { ...err } : { error: "something went wrong" });
}

export const notFound = (req: Request, res: Response, next: NextFunction) => res.status(404).json({ message: 'Not Found' })