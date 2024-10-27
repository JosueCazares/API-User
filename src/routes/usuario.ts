import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse,UsuarioSinPass } from '../lib/types';
import type { Usuario } from '@prisma/client';
import {ZodUsuarioIdObj,ZodUserPassObj} from '@/validation/ZodUsuario'
import { z, type ZodIssue } from 'zod';
import { validacionToken} from '@/middleware/validation'
import {createUsuario,updateusuario,deleteUsuario} from '@/controller/UsuarioController'
import jwt from 'jsonwebtoken'

export const router = Router();
const secret = process.env.SECRET;

router.get('/',validacionToken, async (_: Request, res: Response) => {
    try{

        let usuarios = await prisma.usuario.findMany({
            select:{
                id: true,
                createdAt: true,
                updatedAt: true,
                nombre: true,
                correo: true,
                contrasena: true,
                estatus: true,
                fechaCreacion: true,
                rolId: false,
                rol: {
                    select: {
                        nombre: true
                    }
                }
            }
        });

        let responseOk: APIResponse<UsuarioSinPass[]> = {
            status: 'success',
            data: usuarios
        }
        return res.status(200).json(responseOk)
    } catch (error) {
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }

        return res.status(500).json(responseError)
    }
});

router.post('/',createUsuario);

router.put('/',updateusuario);

router.put('/newPass', async (req: Request, res: Response) => {
    try{
        let dataValidate = ZodUserPassObj.parse(req.body)
        let response: APIResponse<String> = {
            status: "success",
        }
        if (secret === undefined) {
            response = {
                status: 'error',
                error: 'secret undefined'
            }

            return res.status(500).json(response)
        }
        let decode: any;
        try{
            decode = jwt.verify(dataValidate.token, secret)
        } catch (error) {
            response = {
                status: 'error',
                error: 'Token invalido'
            }
            return res.status(401).json(response)
        }
        
        const id = decode.id;
        const userUpdate = await prisma.usuario.update({
            where: {
                id: id
            },
            data: {
                contrasena: dataValidate.nuevaPass
            }
        });
        if (!userUpdate) {
            response = {
                status: 'error',
                error: 'No se pudo cambiar la contraseña'
            }
            return res.status(400).json(response)
        }

        response = {
            status: 'success',
            data: 'Password cambiado'
        }
        return res.status(200).json(response)

    } catch (error) {
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
            console.log(error);
            return res.status(400).json(responseErrorZod)
        }
        console.log(error);
        return res.status(500).json(responseError)
    }
});

router.delete('/',deleteUsuario)
