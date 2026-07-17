import { z } from 'zod';
import { BasicInfoQuerySchema } from './schema.js';

export type BasicInfoQuery = z.infer<typeof BasicInfoQuerySchema>;