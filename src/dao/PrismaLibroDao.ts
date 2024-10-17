import type {LibreriaDao} from '@/dao/LibreriaDao'
import { prisma } from '@/db/index';
import type { Libro } from '@prisma/client';

export class PrismaLibroDao implements LibreriaDao {

    async getAll(): Promise<Libro[]> {
        return prisma.libro.findMany();
    }

    async getById(id: number): Promise<Libro | null> {
        return prisma.libro.findUnique({
            where: { id }
        });
    }

    async create(libroData: Omit<Libro, 'id' | 'createdAt' | 'updatedAt'>): Promise<Libro> {
        return prisma.libro.create({
            data: libroData
        });
    }

    async update(id: number, libroData: Libro): Promise<Libro | null> {
        return prisma.libro.update({
            where: { id },
            data: libroData
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.libro.delete({
            where: { id }
        });
    }

}

