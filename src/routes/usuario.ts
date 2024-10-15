import { Router } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../db'
import type { APIResponse,UsuarioSinPass } from '../lib/types';
import type { Usuario } from '@prisma/client';
import {ZodUsuarioObj,ZodUsuarioIdObj,ZodUserPassObj} from '@/validation/ZodUsuario'
import { z, type ZodIssue } from 'zod';
import { validacionToken} from '@/middleware/validation'
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

router.post('/', async (req: Request, res: Response) => {
    try{
        //VALIDACION DE DATOS
        console.log(req.body);
        const dataValidate = ZodUsuarioObj.parse(req.body)
        //BUSCAR USUARIO PARA VALIDAR DUPLICIDAD DE CORREOS
        let userFind = await prisma.usuario.findFirst({
            where:{
                OR: [
                    {nombre: dataValidate.nombre},
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
            data: {
                ...dataValidate,
                rol:{
                    connect:{
                       id: dataValidate.rol
                    }
                }
            }
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
            console.log(error);
            return res.status(400).json(responseErrorZod)
        }
        console.log(error);
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
        let rolFInd = await prisma.rol.findFirst({
            where:{
                id: dataValidate.rol
            }
        })

        if(!rolFInd){
            let responseError:APIResponse<null> = {
                status: "error",
                error: "El rol no existe"
            }
            console.log(responseError);
            return res.status(400).json(responseError);
        }
        // ACTUALIZACION DE USUARIO
        let userUpdate = await prisma.usuario.update({
            where: {
                id: dataValidate.id
            },
            data:{
                nombre: dataValidate.nombre,
                correo: dataValidate.correo,
                estatus: dataValidate.estatus,
                contrasena: dataValidate.contrasena,
                rol:{
                    connect:{
                        id: dataValidate.rol
                    }
                }
            }
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
            console.log(error);
            return res.status(400).json(responseErrorZod)
        }
        console.log(error);
        return res.status(500).json(responseError)
    }
});

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

