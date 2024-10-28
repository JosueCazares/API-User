import type {AccessDao} from '@/dao/AccessDao'
import type { UsuarioLog } from '@/lib/types'
import type { Usuario } from '@prisma/client'
import {prisma} from '@/db/index'

export class PrismaAccessDao implements AccessDao{
    async login(correo: string,contrasena:string): Promise<Usuario | null> {

        let userFind =  prisma.usuario.findFirst({
            where: {
                correo: correo,
                contrasena: contrasena
            },
            
        })

        if(!userFind){
            return null
        }

        return userFind;
    }
}