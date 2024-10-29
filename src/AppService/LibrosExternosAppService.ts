import {LibroViewModel} from '@/viewModels/LibroViewModel'
import {httpAPI} from '@/lib/api'
import type {APIResponse} from '@/lib/types'

const API = import.meta.env.VITE_URL_API_JASO;

export class LibrosExternosAppService{
    async getAll():Promise <LibroViewModel[]>{
    try{
        const response = await httpAPI<APIResponse<LibroViewModel[]>>('/', 'GET',undefined,{},API);
       // console.log(response);
        

        return response.data ?? [];
    }catch(e){
        console.error('Error en getUsuarios =>', e);
        throw e;
    }
    }
}