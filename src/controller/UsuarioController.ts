import type {Request,Response} from 'express'
import {CreateUsuarioCommand} from '@/commands/usuario/CreateUsuarioCommand'
import {UpdateUsuarioCommand} from '@/commands/usuario/UpdateUsuarioCommand'
import {DeleteUsuarioCommand} from '@/commands/usuario/DeleteUsuarioCommand'
import {ZodUsuarioObj} from '@/validation/ZodUsuario'
import type {APIResponse} from '@/lib/types'
import {z,type ZodIssue} from 'zod'
import type {Usuario} from '@prisma/client'

export const createUsuario = async (req: Request, res: Response) => {
    try{
        const command = new CreateUsuarioCommand();
        const newUsuario = await command.execute(req.body);

        let responseOk: APIResponse<Usuario> = {
            status: 'success',
            data: newUsuario
        }
        return res.status(201).json(responseOk)
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
}

export const updateusuario =  async (req: Request, res: Response) => {
    try {
        const command = new UpdateUsuarioCommand();
        const userUpdate = await command.execute(req.body);

        let responseOk:APIResponse<Usuario> = {
            status: "success",
            data: userUpdate
        }

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
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try{
        const command = new DeleteUsuarioCommand();
        const usetDelete = await command.execute(req.body);

        let responseOk:APIResponse<Usuario> = {
            status: "success",
            data: usetDelete
        }

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
};