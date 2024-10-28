import type{Usuario} from '@prisma/client'
import type {UsuarioLog} from '@/lib/types'
export interface AccessDao {
    login(correo: string,contrasena:string): Promise<Usuario | null>;
    
    //register(usuarioData: Usuario): Promise<UsuarioSinPass>;
}