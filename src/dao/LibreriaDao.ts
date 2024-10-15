import type { Libro } from "@prisma/client";

export interface LibreriaDao {
   getAll(): Promise<Libro[]>;
   getById(id: number): Promise<Libro | null>;
   create(libroData: Libro): Promise<Libro>; 
   update(id: number, libroData: Libro): Promise<Libro | null>;
   delete(id: number): Promise<void>;
}