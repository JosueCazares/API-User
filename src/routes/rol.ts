import {Router,type Request, type Response } from 'express'
import { prisma } from '../db'
import type { APIResponse } from '@/lib/types';
import type { Rol } from '@prisma/client';
import { z, type ZodIssue } from 'zod';
import {ZodRolObj,ZodRolIdObj,ZodRolId} from '@/validation/ZodRol'

export const router = Router();

router.get('/', async (_:Request, res:Response) => {
    try{
        let roles = await prisma.rol.findMany({
            select:{
                id: true,
                nombre: true,
                descripcion: true,
                Usuario: true,
            }
        });

        let responseOk: APIResponse<Rol[]> = {
            status: 'success',
            data: roles
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

router.post('/', async (req:Request, res:Response) => {
    try{
        let dataValidate = ZodRolObj.parse(req.body)

        let rolFind = await prisma.rol.findFirst({
            where:{
                OR: [
                    {nombre: dataValidate.nombre}
                ]
            }
        })
        if(rolFind){
            let responseError:APIResponse<null> = {
                status: "error",
                error: "El rol ya existe"
            }
            return res.status(400).json(responseError);
        }
        let newRol = await prisma.rol.create({
            data: dataValidate
        })
        let responseOk: APIResponse<Rol> = {
            status: 'success',
            data: newRol
        }
        return res.status(200).json(responseOk)

    }catch (error) {
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

router.put('/', async (req:Request, res:Response) => {
    try{
        
        let dataValidate = ZodRolIdObj.parse(req.body);

        let rolFind = await prisma.rol.findFirst({
            where:{
                id: dataValidate.id
            }
        })

        if(!rolFind){
            let responseError:APIResponse<null> = {
                status: "error",
                error: "El id del rol no existe"
            }
            return res.status(400).json(responseError);
        }

        let rolUpdate = await prisma.rol.update({
            where:{
                id: dataValidate.id
            },
            data: dataValidate
        })

        let responseOk: APIResponse<Rol> = {
            status: 'success',
            data: rolUpdate
        }

        return res.status(200).json(responseOk)
    }catch (error) {
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

router.delete('/', async (req:Request, res:Response) => {
    try{
        let dataValidate = ZodRolId.parse(req.body);

        let rolFind = await prisma.rol.findFirst({
            where:{
                id: dataValidate.id
            }
        });

        if(!rolFind){
            let responseError:APIResponse<null> = {
                status: "error",
                error: "El id del rol no existe"
            }
            return res.status(400).json(responseError);
        }
        let rolUsuario = await prisma.usuario.findFirst({
            where:{
                rolId: dataValidate.id
            }
        })

        if(rolUsuario){
            let responseError:APIResponse<null> = {
                status: "error",
                error: "El rol tiene usuarios asignados"
            }
            return res.status(400).json(responseError);
        }

        let rolDelete = await prisma.rol.delete({
            where:{
                id: dataValidate.id
            }
        })

        let responseOk: APIResponse<Rol> = {
            status: 'success',
            data: rolDelete
        }

        return res.status(200).json(responseOk)

    }catch (error) {
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