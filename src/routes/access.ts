import  {type Request,type Response, Router} from 'express';
import type{ APIResponse } from '@/lib/types';
import { z, type ZodIssue } from 'zod';
import { ZodAccessObj } from '@/validation/ZodAccess';
import { prisma } from '../db';
import { type Usuario } from '@prisma/client';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

export const router = Router();

type UsuarioLog = {
    id: number;
    nombre: string;
    rol: string;
};

router.post('/login', async (req: Request, res: Response) => {
    let responseError: APIResponse<Error> = {
        status: 'success',
    }
    try{
        const dataValidate = ZodAccessObj.parse(req.body);

        const userFind = await prisma.usuario.findUnique({
            where:{
                correo:dataValidate.correo,
                contrasena:dataValidate.contrasena
            }
        });
        
        if(!userFind){
            responseError = {
                status: 'error',
                error: 'Usuario no encontrado'
            }
            return res.status(401).json(responseError);
        }

        const accsToken = generarToken(userFind,"1h");

        let responseOk:APIResponse<UsuarioLog> = {
            status: 'success',
            jwt: accsToken,
            data: {
                id: userFind.id,
                nombre: userFind.nombre,
                rol: userFind.rol
            }
        }
        return res.status(200).json(responseOk);

    }  catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod:APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos invalidos",
                data: error.errors
            }
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});


function generarToken(usuarioBusq: Usuario, time: string): string {
    if (typeof secret === 'undefined') {
        throw new Error('secret undefined');
    }
    return jwt.sign(usuarioBusq, secret, { expiresIn: time });
}