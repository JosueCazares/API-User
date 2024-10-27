import type {Libro} from '@prisma/client'
import {PrismaLibroDao} from '@/dao/PrismaLibroDao'
import {ZodLibroObjPut} from '@/validation/ZodLibro'
import {z} from 'zod'
const libroDao = new PrismaLibroDao();


export class UpdateLibroCommand{
    async execute(data: UpdateLibroCommand, urlPdf:string): Promise<Libro>{

        const dataValidate = ZodLibroObjPut.parse(data)
        if (!dataValidate) {
            throw new z.ZodError(dataValidate);
        }

        const findLibro = await libroDao.getById(dataValidate.id)

        if(!findLibro){
            throw new Error("Libro no encontrado")
        }

        return await libroDao.update(dataValidate.id, {
            titulo: dataValidate.titulo,
            autor: dataValidate.autor,
            genero: dataValidate.genero,
            estatus: dataValidate.estatus,
            url: urlPdf
        }) 
    }
}