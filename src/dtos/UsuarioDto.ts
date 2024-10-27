import type {Estatus} from '@prisma/client'

export interface CreateUsuarioDto{
    nombre :string,
    correo :string,
    contrasena :string,
    estatus :Estatus,
    rol :number,
}