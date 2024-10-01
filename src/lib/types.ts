 import type{
    Usuario,
    Rol,
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


export type{
    Usuario,
    Rol,
}