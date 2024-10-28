import  {type Request,type Response, Router} from 'express';
import type{ APIResponse } from '@/lib/types';
import { z, type ZodIssue } from 'zod';
import { ZodAccessObj } from '@/validation/ZodAccess';
import { prisma } from '../db';
import { type Usuario } from '@prisma/client';
import jwt from 'jsonwebtoken';
import {login} from '@/controller/LoginController'

export const router = Router();



router.post('/login', login)