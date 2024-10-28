import type {UsuarioLog,LoginDto} from '@/dtos/LoginDto'
import {ZodAccessObj} from '@/validation/ZodAccess'
import {z} from 'zod'
import  {PrismaAccessDao} from '@/dao/PrismaAccess'
import type {Usuario} from '@prisma/client'

const accesDao = new PrismaAccessDao();

export class LoginCommand{
    async execute(data: LoginDto): Promise<Usuario | null>{
        const dataValidate = ZodAccessObj.parse(data)
        if (!dataValidate) {
            throw new z.ZodError(dataValidate);
        }
        return await accesDao.login(dataValidate.correo,dataValidate.contrasena)
    }
}