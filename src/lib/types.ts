 import type{
    Usuario,
    Rol,
    Libro,
    Estatus,
} from '@prisma/client'; 

export type APIResponse<T> = {
    status: 'success' | 'error',
    data?: T,
    jwt?: string,
    error?: unknown
}

export interface LoginResponseData {
    rol: string;
    id: string;
    username: string;
}

export interface UsuarioSinPass{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    nombre: string;
    correo: string;
    contrasena: string;
    estatus: string;
    fechaCreacion: Date;
    rol: {
        nombre: string;
    };
}

export interface LibroMVVM{
    nombreLibro: string;
    autor:string;
    genero:string;
    estatus:Estatus;
    archivoPdf:string | null;
}

export type UsuarioLog = {
    id: number;
    nombre: string;
    rol: string;
};
export type{
    Usuario,
    Rol,
    Libro
}