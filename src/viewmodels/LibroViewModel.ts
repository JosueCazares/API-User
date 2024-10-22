import type {Libro} from '@prisma/client'
import {PrismaLibroDao} from '@/dao/PrismaLibroDao'
import type {CreateLibroDto} from '@/dtos/LibroDto'
import {ZodLibroObj} from '@/validation/ZodLibro'
import {z} from 'zod'

export class LibroViewModel {
    private libroDao : PrismaLibroDao;

    constructor () {
        this.libroDao = new PrismaLibroDao;
    }

    async getAll(): Promise<Libro[]> {
        return await this.libroDao.getAll();
    }

    async createLibro(data: CreateLibroDto, urlPdf: string): Promise<Libro> {
        // Validar con Zod
        const parseResult = ZodLibroObj.safeParse(data);
        if (!parseResult.success) {
          throw new z.ZodError(parseResult.error.errors);
        }
    
        // Crear el libro usando el DAO
        return await this.libroDao.create({
          titulo: parseResult.data.titulo,
          autor: parseResult.data.autor,
          genero: parseResult.data.genero,
          estatus: parseResult.data.estatus,
          url: urlPdf,
        });
      }


}