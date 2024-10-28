import {prisma} from '@/db/index'
import { Router, type Request, type Response } from 'express';
import type { APIResponse,Libro,LibroMVVM } from '../lib/types';
import {upload} from "@/lib/files"
import {PrismaLibroDao} from '@/dao/PrismaLibroDao' 
import {createLibro,updateLibro,deleteLibro} from '@/controller/LibroController'
import {LibroViewModel} from '@/viewModels/LibroViewModel'

export const router = Router();
const libroDao = new PrismaLibroDao();

router.get('/', async (_: Request, res: Response) => {
    try{

        let libros = await libroDao.getAll();

        const libroDto = libros.map((libro) => LibroViewModel.toDto(libro));

        let responseOk: APIResponse<LibroMVVM[]> = {
            status: 'success',
            data: libroDto
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

router.post('/',upload.single('pdf'),createLibro);

router.put('/',upload.single('pdf'), updateLibro);

//ENDPOIJT PARA PRUEBAS DE SUBIR PDF SOLAMENTE
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

router.delete('/',deleteLibro)