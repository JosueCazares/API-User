import {LibroViewModel} from '@/viewModels/LibroViewModel'
import {httpAPI} from '@/lib/api'
import type {APIResponse} from '@/lib/types'

const API_JASSO = import.meta.env.VITE_URL_API_JASO;
const API_ULISSES = import.meta.env.VITE_URL_API_ULISES;

export class LibrosExternosAppService{
    async getAll():Promise <LibroViewModel[]>{
    try{
        if(!API_JASSO || !API_ULISSES){
            throw new Error('No se han definido las URL de los servicios externos');
        }
        const responseJasso = await this.fetchApi(API_ULISSES);
        const responseUlises = await this.fetchApi(API_ULISSES);
        const responsUnion = responseJasso.data?.concat(responseUlises.data ?? []);
        return responsUnion ?? [];
    }catch(e){
        console.error('Error en getUsuarios =>', e);
        throw e;
    }
    }

    private async fetchApi(url:string):Promise<APIResponse<LibroViewModel[]>>{
    try{
        const response = await httpAPI<APIResponse<LibroViewModel[]>>('/', 'GET',undefined,{},url);
        return {
            status: response.status, // Ensure the status is included
            data: response.data ?? []
        };
    }catch(e){
        console.log(`Error en fetchApi => ${e}`);
        return {status: 'error', error: e, data: []};
    }
    }
}