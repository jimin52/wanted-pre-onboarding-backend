import { z } from 'zod';

export const GetApplicationQuery = z.object({
    search: z.string().min(1).max(255)
});