import type {Request,Response} from 'express'
import {CreateLibroCommand} from '@/commands/libro/CreateLibroCommand'
import {UpdateLibroCommand} from '@/commands/libro/UpdateLibroCommand'
import {DeleteLibroCommand} from '@/commands/libro/DeleteLibroCommand'
import type {APIResponse} from '@/lib/types'
import {z,type ZodIssue} from 'zod'
import type {Libro} from '@prisma/client'
import {LibroViewModel} from '@/viewModels/LibroViewModel'
import {PrismaLibroDao} from '@/dao/PrismaLibroDao'
import {LibrosExternosAppService} from '@/AppService/LibrosExternosAppService'
import fs from 'fs';

const libroDao = new PrismaLibroDao();


export const getAllLibro = async (req: Request, res: Response) => {
    try{

   const libros = await libroDao.getAll();


    let responseOk: APIResponse<Libro[]> = {
        status: 'success',
        data: libros
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
}};
export const getAllPublicLibro = async (req: Request, res: Response) => {
    try{

        // Consultar rl dao
        // Mapear al viewmodel
        // retornar el viewmodel
   const libros = await libroDao.getAll();
   const librosPublic = libros.map((libro) => LibroViewModel.toDto(libro));

    let responseOk: APIResponse<LibroViewModel[]> = {
        status: 'success',
        data: librosPublic
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
}};

export const getAllPublicTodoLibro = async (req: Request, res: Response) => {
    try{
        // Traes tus libros y los mapeas al viewmodel
        // mandas llamar el appservice
        // unes los dos arreglos, y retornas el resultado

        //Este metodo ya viene con los libros mapeados del MVVM
        const librosLocales = await libroDao.getAllPublic();
        const librosExternos = await new LibrosExternosAppService().getAll();

        const libros:LibroViewModel[] = [...librosLocales, ...librosExternos];
        //console.log(libros);
    let responseOk: APIResponse<LibroViewModel[]> = {
        status: 'success',
        data: libros
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
}};

export const createLibro = async (req: Request, res: Response) => {
    try{
       
        if (!req.file) {
            return res.status(400).json({
              status: 'error',
              message: 'No se subió ningún archivo.'
            });
        }
        const pdfPath = req.file.path;
        const pdfBuffer = fs.readFileSync(pdfPath);
        const pdfBase64 = pdfBuffer.toString('base64');
        console.log(pdfBase64);
        const command = new CreateLibroCommand();
        const newLibro = await command.execute(req.body,pdfBase64);

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