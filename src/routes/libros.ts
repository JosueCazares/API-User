import {prisma} from '@/db/index'
import { Router, type Request, type Response } from 'express';
import type { APIResponse,Libro } from '../lib/types';
import { z, type ZodIssue } from 'zod';
import  {ZodLibroObj,ZodLibroObjPut,ZodLibroObjFile} from '@/validation/ZodLibro'
import {upload} from "@/lib/files"
 
export const router = Router();


router.get('/', async (_: Request, res: Response) => {
    try{

        let libro = await prisma.libro.findMany({
        });

        let responseOk: APIResponse<Libro[]> = {
            status: 'success',
            data: libro
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

router.post('/',upload.single('pdf'), async (req: Request, res: Response) => {
    try{
        const dataValidate = ZodLibroObj.parse({
            titulo: req.body.titulo,
            autor: req.body.autor,
            genero: req.body.genero,
            estatus: req.body.estatus,
        })
        if (!req.file) {
            return res.status(400).json({
              status: 'error',
              message: 'No se subió ningún archivo.'
            });
          }
        const url = req.file.path;
        let libro = await prisma.libro.create({
            data:{
                titulo: dataValidate.titulo,
                autor: dataValidate.autor,
                genero: dataValidate.genero,
                estatus: dataValidate.estatus,
                url: url
            },

                
        });

        let responseOk: APIResponse<Libro> = {
            status: 'success',
            data: libro
        }
        return res.status(200).json(responseOk)

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

router.put('/',upload.single('pdf'), async (req: Request, res: Response) => {
    try{
        const dataValidate = ZodLibroObjPut.parse(req.body)
        const newId = parseInt(dataValidate.id)
        let libroFInd = await prisma.libro.findFirst({
            where:{
                id: newId
            }
        })

        if(!libroFInd){
            let responseError: APIResponse<Error> = {
                status: "error",
                error: "Libro no encontrado"
            }
            return res.status(404).json(responseError)
        }
        if (!req.file) {
            return res.status(400).json({
              status: 'error',
              message: 'No se subió ningún archivo.'
            });
          }
          const url = req.file.path;
        let libro = await prisma.libro.update({
            where:{
                id:newId
            },
            data:{
                titulo: dataValidate.titulo,
                autor: dataValidate.autor,
                genero: dataValidate.genero,
                estatus: dataValidate.estatus,
                url: url
            }
                
        });

        let responseOk: APIResponse<Libro> = {
            status: 'success',
            data: libro
        }
        return res.status(200).json(responseOk)

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


router.post('/file', upload.single('file'), async (req: Request, res: Response) => {
    try{
        if (!req.file) {
            return res.status(400).json({
              status: 'error',
              message: 'No se subió ningún archivo.'
            });
          }
        console.log(req.file);
        return res.status(200).json({
            data:'Archivo subido'
        })
    }catch(error){
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        return res.status(500).json(responseError)
    }
})