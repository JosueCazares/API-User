import {z} from 'zod';

export const ZodRolObj = z.object({
    nombre: z.string().min(3).max(30),
    descripcion: z.string().min(3).max(50)
});