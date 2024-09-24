import {Router,type Request, type Response } from 'express'
import { prisma } from '../db'
import type { APIResponse } from '@/lib/types';
import type { Rol } from '@prisma/client';
import { z, type ZodIssue } from 'zod';
import {ZodRolObj} from '@/validation/ZodRol'

export const router = Router();

router.get('/', async (_:Request, res:Response) => {
    try{
        let roles = await prisma.rol.findMany();

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
            return res.status(400).json(responseErrorZod)
        }
        return res.status(500).json(responseError)
    }
})