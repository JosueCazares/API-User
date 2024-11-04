import type { Libro } from "@prisma/client";

export class LibroViewModel{
  static toDto(libro:Partial<Libro>):LibroViewModel{
    return{
      nombreLibro:libro.titulo,
      autor:libro.autor,
      genero:libro.genero,
      estatus:libro.estatus,
      pdf_file:libro.url,
      universidad:libro.universidad,
    }
  }
}