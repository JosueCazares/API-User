import type {Usuario} from '@prisma/client'
import {PrismaUsuarioDao} from '@/dao/PrismaUsuarioDao'
import {ZodUsuarioIdObj} from '@/validation/ZodUsuario'
import {z} from 'zod'

const usuarioDao = new PrismaUsuarioDao();

export class DeleteUsuarioCommand{
    async execute(data: DeleteUsuarioCommand): Promise<Usuario>{

        const dataValidate = ZodUsuarioIdObj.parse(data)
        if (!dataValidate) {
            throw new z.ZodError(dataValidate);
        }

        const findUsuario = await usuarioDao.getById(dataValidate.id)

        if(!findUsuario){
            throw new Error("Usuario no encontrado")
        }

        return await usuarioDao.delete(dataValidate.id) 
    }
}