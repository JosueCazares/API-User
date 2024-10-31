import {LibroViewModel} from '@/viewModels/LibroViewModel'
import {httpAPI} from '@/lib/api'
import type {APIResponse} from '@/lib/types'

const API_JASSO = import.meta.env.VITE_URL_API_JASO;
const API_ULISSES = import.meta.env.VITE_URL_API_ULISES;

export class LibrosExternosAppService{
    async getAll():Promise <LibroViewModel[]>{
    try{
        const responseJasso = await httpAPI<APIResponse<LibroViewModel[]>>('/', 'GET',undefined,{},API_JASSO);
        const responseUlises = await httpAPI<APIResponse<LibroViewModel[]>>('/', 'GET',undefined,{},API_ULISSES);
       
        
        const responsUnion = responseJasso.data?.concat(responseUlises.data ?? []);
        return responsUnion ?? [];
    }catch(e){
        console.error('Error en getUsuarios =>', e);
        throw e;
    }
    }
}