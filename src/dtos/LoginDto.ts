export type UsuarioLog  = {
    id: number;
    nombre: string;
    rol: string;
};

export interface LoginDto {
    correo: string;
    contrasena: string;
}