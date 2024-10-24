import {prisma} from '@/db/index'
import type {Libro} from '@prisma/client'
import {PrismaLibroDao} from '@/dao/PrismaLibroDao'
import {ZodLibroObjDelete} from '@/validation/ZodLibro'
import {z} from 'zod'
const libroDao = new PrismaLibroDao();


export class DeleteLibroCommand{
    async execute(data: DeleteLibroCommand): Promise<Libro>{

        const dataValidate = ZodLibroObjDelete.parse(data)
        if (!dataValidate) {
            throw new z.ZodError(dataValidate);
        }

        const findLibro = await libroDao.getById(dataValidate.id)

        if(!findLibro){
            throw new Error("Libro no encontrado")
        }

        return await libroDao.delete(dataValidate.id) 
    }
}