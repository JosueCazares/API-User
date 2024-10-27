import type {Usuario} from '@prisma/client';

export interface UsuarioDao {
    getAll(): Promise<Usuario[]>;
    getById(id: number): Promise<Usuario | null>;
    create(usuarioData: Usuario): Promise<Usuario>;
    update(id: number, usuarioData: Usuario): Promise<Usuario | null>;
    delete(id: number): Promise<Usuario>;
}