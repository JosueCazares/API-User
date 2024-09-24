import type { APIResponse } from '@/lib/types';
import type { Estatus,Rol } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

interface UsuarioPy {
    id :number,
    nombre :string,
    correo :string,
    contrasena :string,
    estatus :Estatus,
    rol :Rol,
}

export interface CustomRequest extends Request {
    usuario?: UsuarioPy;
}

export function validacionToken(req: CustomRequest, res: Response, next: NextFunction) {
    const authH = req.headers['authorization'];

    let response:APIResponse<String> = {
        status:'success'
    };

    if(!authH){
        response = {
            status:'error',
            error:'Headers autorization empty'
        }
        return res.status(500).json(response);
    }
    if(typeof secret === 'undefined'){
        response = {
            status:'error',
            error:'Secret not defined'
        };
        return res.status(500).json(response);
    }

    const token = authH.split(' ')[1];

    jwt.verify(token, secret, (err, user) => {
        if(err){
            response = {
                status:'error',
                error:'Access denied'
            };
            return res.status(401).json(response);
        }else{
            req.usuario = user as UsuarioPy;
            next();
        }
    });
};