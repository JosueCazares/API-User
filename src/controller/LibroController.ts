import type {Request,Response} from 'express'
import {CreateLibroCommand} from '@/commands/libro/CreateLibroCommand'
import {UpdateLibroCommand} from '@/commands/libro/UpdateLibroCommand'
import {DeleteLibroCommand} from '@/commands/libro/DeleteLibroCommand'
import {ZodLibroObj} from '@/validation/ZodLibro'
import type {APIResponse} from '@/lib/types'
import {z,type ZodIssue} from 'zod'
import type {Libro} from '@prisma/client'


export const createLibro = async (req: Request, res: Response) => {
    try{
       
        if (!req.file) {
            return res.status(400).json({
              status: 'error',
              message: 'No se subió ningún archivo.'
            });
        }

        const command = new CreateLibroCommand();
        const newLibro = await command.execute(req.body,req.file.path);

        let responseOk: APIResponse<Libro> = {
            status: 'success',
            data: newLibro
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
export const updateLibro = async (req: Request, res: Response) => {
    try{
       
        if (!req.file) {
            return res.status(400).json({
              status: 'error',
              message: 'No se subió ningún archivo.'
            });
        }

        const command = new UpdateLibroCommand();
        const updateLibro = await command.execute(req.body,req.file.path);

        let responseOk: APIResponse<Libro> = {
            status: 'success',
            data: updateLibro
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
export const deleteLibro = async (req: Request, res: Response) => {
    try{
       

        const command = new DeleteLibroCommand();
        const deleteLibro = await command.execute(req.body);

        let responseOk: APIResponse<Libro> = {
            status: 'success',
            data: deleteLibro
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