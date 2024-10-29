import { Router, type Request, type Response } from 'express';
import type { APIResponse, } from '../lib/types';
import {upload} from "@/lib/files"
import {PrismaLibroDao} from '@/dao/PrismaLibroDao' 
import {createLibro,updateLibro,deleteLibro,getAllPublicTodoLibro,getAllPublicLibro,getAllLibro} from '@/controller/LibroController'

export const router = Router();
const libroDao = new PrismaLibroDao();

//ENDPOINT PARA OBTENER TODOS LOS LIBROS SIN IMPORTAR SI SON PUBLICOS O NO
router.get('/',getAllLibro)

//ENDPOINT PARA OBTENER TODOS LOS LIBROS CON CAMPOS PUBLICOS 
router.get('/Public', getAllPublicLibro);

//ENDPOINT PARA OBTENER TODOS LOS LIBROS CON CAMPOS PUBLICOS Y DE LIBROS EXTERNOS
router.get('/AllPublic', getAllPublicTodoLibro);

//ENDPOINT PARA CREAR LIBRO
router.post('/',upload.single('pdf'),createLibro);

//ENDPOINT PARA ACTUALIZAR LIBRO
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

//ENDPOINT PARA ELIMINAR LIBRO DE MANERA LOGICA
router.delete('/',deleteLibro)