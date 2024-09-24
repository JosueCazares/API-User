import {z} from 'zod'
import {Estatus,Rol} from '@prisma/client'
export const ZodUsuarioObj = z.object({
    nombre :z.string(),
    correo :z.string().email(),
    contrasena :z.string().min(8),
    estatus :z.enum([Estatus.ACTIVO, Estatus.INACTIVO]),
    rol :z.enum([Rol.ALUMNO, Rol.PROFESOR, Rol.ASPIRANTE,Rol.RECURSOS_HUMANOS,Rol.SERVICIOS_ESCOLARES,Rol.TI]),
    
});
export const ZodUsuarioIdObj = z.object({
    id :z.number().positive().min(1),
    nombre :z.string(),
    correo :z.string().email(),
    contrasena :z.string().min(8),
    estatus :z.enum([Estatus.ACTIVO, Estatus.INACTIVO]),
    rol :z.enum([Rol.ALUMNO, Rol.PROFESOR, Rol.ASPIRANTE,Rol.RECURSOS_HUMANOS,Rol.SERVICIOS_ESCOLARES,Rol.TI]),
    
});