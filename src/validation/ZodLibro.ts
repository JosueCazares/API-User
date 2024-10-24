import {z} from 'zod'
import {Estatus} from '@prisma/client'

export const ZodLibroObj = z.object({
    titulo: z.string(),
    autor: z.string(),
    genero: z.string(),
    estatus: z.enum([Estatus.ACTIVO,Estatus.INACTIVO])
})
export const ZodLibroObjPut = z.object({
    id: z.string(),
    titulo: z.string(),
    autor: z.string(),
    genero: z.string(),
    estatus: z.enum([Estatus.ACTIVO,Estatus.INACTIVO])
})

export const ZodLibroObjFile = z.object({
    mimetype: z.string().refine((type) => type === "application/pdf", {
      message: "El archivo debe ser un PDF",
    }),
    originalname: z.string().min(1, "Nombre de archivo no encontrado"),
    path: z.string().min(1, "Ruta de archivo no encontrada"),
  });

export const ZodLibroObjDelete = z.object({
    id: z.string()
})  