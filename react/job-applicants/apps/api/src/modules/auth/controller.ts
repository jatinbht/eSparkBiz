import { loginService, signupService } from './service.js';
import type { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
  const result = await loginService(req.body);
  res.json(result);
}

export async function signup(req: Request, res: Response) {
  const result = await signupService(req.body);
  res.status(201).json(result);
}
