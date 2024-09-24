import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse } from '../lib/types';
import type { Usuario } from '@prisma/client';
import {ZodUsuarioObj,ZodUsuarioIdObj} from '@/validation/ZodUsuario'
import { z, type ZodIssue } from 'zod';
import { validacionToken} from '@/middleware/validation'

export const router = Router();

router.get('/',validacionToken, async (_: Request, res: Response) => {
    try{

        let usuarios = await prisma.usuario.findMany();

        let responseOk: APIResponse<Usuario[]> = {
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

router.post('/', async (req: Request, res: Response) => {
    try{
        //VALIDACION DE DATOS
        const dataValidate = ZodUsuarioObj.parse(req.body)
        //BUSCAR USUARIO PARA VALIDAR DUPLICIDAD DE CORREOS
        let userFind = await prisma.usuario.findFirst({
            where:{
                OR: [
                    {correo: dataValidate.correo}
                ]
            }
        })
         //Validacion de duplicidad de datos
         if(userFind){
            let responseError:APIResponse<null> = {
                status: "error",
                error: "El username o email ya existe"
            }
            return res.status(400).json(responseError);
        }
        //CREACIO DE USUARIO
        let newUser = await prisma.usuario.create({
            data: dataValidate
        });
        //RESPUESTA TIPADA 
        let responseOk:APIResponse<Usuario> = {
            status: "success",
            data: newUser
        }
        //RESPUESTA
        return res.status(200).json(responseOk);
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
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});

router.put('/', async (req: Request, res: Response) => {
    try{
        //VALIDACION DE DATOS
        const dataValidate = ZodUsuarioIdObj.parse(req.body)
        //Busqueda de usuario actual
        let userFind = await prisma.usuario.findUnique({
            where:{
                id: dataValidate.id
            }
        })
        if(!userFind){
            let responseError:APIResponse<null> = {
                status: "error",
                error: "El usuario no existe"
            }
            return res.status(400).json(responseError);
        }
         // BUSCAR SI HAY OTRO USUARIO CON EL MISMO CORREO
         let userWithSameEmail = await prisma.usuario.findFirst({
            where: {
                correo: dataValidate.correo,
                // Evitar buscar al mismo usuario
                NOT: {
                    id: dataValidate.id
                }
            }
        }); 
        // Validación de duplicidad de correo
        if (userWithSameEmail) {
            let responseError: APIResponse<null> = {
                status: "error",
                error: "El email ya existe"
            };
            return res.status(400).json(responseError);
        }

        // ACTUALIZACION DE USUARIO
        let userUpdate = await prisma.usuario.update({
            where: {
                id: dataValidate.id
            },
            data: dataValidate
        });
        //RESPUESTA TIPADA 
        let responseOk:APIResponse<Usuario> = {
            status: "success",
            data: userUpdate
        }
        //RESPUESTA
        return res.status(200).json(responseOk);
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
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
});

