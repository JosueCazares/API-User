import type {LibreriaDao} from '@/dao/LibreriaDao'
import { prisma } from '@/db/index';
import type { Libro } from '@prisma/client';

export class PrismaLibroDao implements LibreriaDao {

    async getAll(): Promise<Libro[]> {
        return prisma.libro.findMany();
    }

    async getById(id: string): Promise<Libro | null> {
        let newId = parseInt(id);
        return prisma.libro.findUnique({
            where: { id:newId }
        });
    }

    async create(libroData: Omit<Libro, 'id' | 'createdAt' | 'updatedAt'>): Promise<Libro> {
        return prisma.libro.create({
            data: libroData
        });
    }

    async update(id: string, libroData: Omit<Libro, 'id' | 'createdAt' | 'updatedAt'>): Promise<Libro> {
        let newId = parseInt(id);
        return prisma.libro.update({
            where: { id: newId },
            data: libroData
        });
    }

    async delete(id: string): Promise<Libro> {
        let newId = parseInt(id);
        return await prisma.libro.update({
            where: { id: newId },
            data: {estatus:'INACTIVO'}
        });
    }

}

