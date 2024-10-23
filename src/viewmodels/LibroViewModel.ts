import type {Libro} from '@prisma/client'


export class LibroViewModel {
    static toDto (libro:Libro){
      return {
        autorMvvm:libro.autor,
        tituloMvvm:libro.titulo,
        generoMvvm:libro.genero
      }
    }


}