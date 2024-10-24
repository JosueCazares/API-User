import type { Libro } from "@prisma/client";

export interface LibreriaDao {
   getAll(): Promise<Libro[]>;
   getById(id: string): Promise<Libro | null>;
   create(libroData: Libro): Promise<Libro>; 
   update(id: string, libroData: Libro): Promise<Libro | null>;
   delete(id: string): Promise<Libro>;
}