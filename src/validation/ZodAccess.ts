import {z} from 'zod';

export const ZodAccessObj = z.object({
    correo: z.string().email(),
    contrasena: z.string(),
});