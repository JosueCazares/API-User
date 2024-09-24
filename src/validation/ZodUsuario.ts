import {z} from 'zod'
import {Estatus} from '@prisma/client'
export const ZodUsuarioObj = z.object({
    nombre :z.string(),
    correo :z.string().email(),
    contrasena :z.string().min(8),
    estatus :z.enum([Estatus.ACTIVO, Estatus.INACTIVO]),
    rol :z.number(),
    
});
export const ZodUsuarioIdObj = z.object({
    id :z.number().positive().min(1),
    nombre :z.string(),
    correo :z.string().email(),
    contrasena :z.string().min(8),
    estatus :z.enum([Estatus.ACTIVO, Estatus.INACTIVO]),
    rol :z.number(),    
});