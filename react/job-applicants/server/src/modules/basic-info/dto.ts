import { z } from 'zod';
import { basicInfoQuerySchema } from './schema.js';

export type BasicInfoQuery = z.infer<typeof basicInfoQuerySchema>;