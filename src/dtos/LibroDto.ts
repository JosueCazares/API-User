import {Estatus} from '@prisma/client'

export interface CreateLibroDto{
    titulo :   string,
    autor  :   string,
    genero :   string,
    estatus :  Estatus, 
    url ?  :    string
}
export interface UpdateLibroDto{
    id     :   number,
    titulo :   string,
    autor  :   string,
    genero :   string,
    estatus :  Estatus, 
    url ?  :    string
}