import {PrismaLibroDao} from '@/dao/PrismaLibroDao'

const libroDao = new PrismaLibroDao();

export class GetAllPublicCommands {
    async execute() {
        return await libroDao.getAllPublic();
    }
}