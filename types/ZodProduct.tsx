import { z } from 'zod';
export const ZodProduct = z.object({
    upca: z.string(),
    title: z.string(),
    containerType: z.string(),
    nutritionalInformation: z.number(),
    loggedItems: z.array(z.number()),
});
