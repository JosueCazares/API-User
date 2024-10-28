import type { Libro } from "@prisma/client";

export class LibroViewModel{
  static toDto(libro:Libro){
    return{
      nombreLibro:libro.titulo,
      autor:libro.autor,
      genero:libro.genero,
      estatus:libro.estatus,
      archivoPdf:libro.url
    }
  }
}