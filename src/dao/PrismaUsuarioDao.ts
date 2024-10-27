import type {UsuarioDao} from '@/dao/UsuarioDao'
import { prisma } from '@/db/index';
import type { Usuario } from '@prisma/client';

export class PrismaUsuarioDao implements UsuarioDao {

    async getAll(): Promise<Usuario[]> {
        return prisma.usuario.findMany();
    }

    async getById(id: number): Promise<Usuario | null> {
        return prisma.usuario.findUnique({
            where: { id }
        });
    }

    async create(usuarioData: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>): Promise<Usuario> {
        return prisma.usuario.create({
            data: usuarioData
        });
    }

    async update(id: number, usuarioData: Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>): Promise<Usuario> {
       
        return prisma.usuario.update({
            where: { id },
            data: usuarioData
        });
    }

    async delete(id: number): Promise<Usuario> {
        
        return await prisma.usuario.update({
            where: { id },
            data: {estatus:'INACTIVO'}
        });
    }

}

