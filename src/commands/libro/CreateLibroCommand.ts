import {prisma} from '@/db/index'
import type {Libro} from '@prisma/client'
import type {CreateLibroDto} from '@/dtos/LibroDto'
import {PrismaLibroDao} from '@/dao/PrismaLibroDao'
import {ZodLibroObj} from '@/validation/ZodLibro'
import {z} from 'zod'
const libroDao = new PrismaLibroDao();


export class CreateLibroCommand{
    async execute(data: CreateLibroDto, urlPdf:string): Promise<Libro>{

        const dataValidate = ZodLibroObj.parse(data)
        if (!dataValidate) {
            throw new z.ZodError(dataValidate);
        }
        return await libroDao.create({
        
            titulo: dataValidate.titulo,
            autor: dataValidate.autor,
            genero: dataValidate.genero,
            estatus: dataValidate.estatus,
            url: urlPdf 
         
        }) 
    }
}