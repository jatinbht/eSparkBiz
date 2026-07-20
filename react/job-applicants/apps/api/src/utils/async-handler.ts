import type { NextFunction, Request, Response } from 'express';

type HandleAsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>


export default function handleAsync(fxn:HandleAsyncFunction) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fxn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}
