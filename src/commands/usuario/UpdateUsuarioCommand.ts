import type {Usuario} from '@prisma/client'
import {ZodUsuarioIdObj} from '@/validation/ZodUsuario'
import {z} from 'zod'
import {PrismaUsuarioDao} from '@/dao/PrismaUsuarioDao'

const usuarioDao = new PrismaUsuarioDao();

export class UpdateUsuarioCommand {
    async execute(data: UpdateUsuarioCommand): Promise<Usuario> {
        const dataValidate = ZodUsuarioIdObj.parse(data);

        if (!dataValidate) {
            throw new z.ZodError(dataValidate);
        }

        const findUsuario = await usuarioDao.getById(dataValidate.id);
        if (!findUsuario) {
            throw new Error("Usuario no encontrado");
        }
        
        return await usuarioDao.update(dataValidate.id, {
            nombre: dataValidate.nombre,
            correo: dataValidate.correo,
            contrasena: dataValidate.contrasena,
            estatus: dataValidate.estatus,
            rolId: dataValidate.rol,
            fechaCreacion: new Date(),
        });
    }
}