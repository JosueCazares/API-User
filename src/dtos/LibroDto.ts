import {Estatus} from '@prisma/client'

export interface CreateLibroDto{
    tituloMvvm :   string,
    autorMvvm  :   string,
    generoMvvm :   string,
    estatusMvvm :  Estatus, 
    url ?  :    string
}