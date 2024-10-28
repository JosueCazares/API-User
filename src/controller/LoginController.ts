import type { Request, Response } from "express";
import type { APIResponse } from "@/lib/types";
import { z, type ZodIssue } from "zod";
import {LoginCommand} from '@/commands/access/LoginCommand'
import {generarToken} from '@/middleware/validation'
import type {UsuarioLog} from '@/lib/types'

export const login = async (req: Request, res: Response) => {
    let responseError: APIResponse<Error> = {
        status: 'error',
    }
    try{

        const comman = new LoginCommand();
        const userFind = await comman.execute(req.body);
        
        if(!userFind){
            responseError = {
                status: 'error',
                error: 'Usuario no encontrado'
            }
            return res.status(401).json(responseError);
        }

        const accesToken = generarToken(userFind,"1h");

        let responseOk:APIResponse<UsuarioLog> = {
            status: 'success',
            jwt: accesToken,
            data: {
                id: userFind.id,
                nombre: userFind.nombre,
                rol: userFind.rolId.toString()
            }
        }
        return res.status(200).json(responseOk)

    } catch (error) {
     responseError = {
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