import type {Usuario} from '@prisma/client'
import type {CreateUsuarioDto} from '@/dtos/UsuarioDto'
import {PrismaUsuarioDao} from '@/dao/PrismaUsuarioDao'
import {ZodUsuarioObj} from '@/validation/ZodUsuario'
import {z} from 'zod'

const usuarioDao = new PrismaUsuarioDao();

export class CreateUsuarioCommand{
    async execute(data: CreateUsuarioDto): Promise<Usuario>{

        const dataValidate = ZodUsuarioObj.parse(data)
        if (!dataValidate) {
            throw new z.ZodError(dataValidate);
        }
        return await usuarioDao.create({
        
            nombre: dataValidate.nombre,
            correo: dataValidate.correo,
            contrasena: dataValidate.contrasena,
            estatus: dataValidate.estatus,
            rolId: dataValidate.rol,
            fechaCreacion: new Date(),
         
        }) 
    }
}