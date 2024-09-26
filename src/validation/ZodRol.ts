import {z} from 'zod';

export const ZodRolObj = z.object({
    nombre: z.string().min(1).max(30),
    descripcion: z.string().min(3).max(50)
});
export const ZodRolIdObj = z.object({
    id: z.number().positive().min(1),
    nombre: z.string().min(1).max(30),
    descripcion: z.string().min(3).max(50)
});

export const ZodRolId = z.object({
    id: z.number().positive().min(1)
});