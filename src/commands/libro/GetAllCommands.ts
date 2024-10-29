import {PrismaLibroDao} from '@/dao/PrismaLibroDao'

const libroDao = new PrismaLibroDao();

export class GetAllCommands {
    async execute() {
        return await libroDao.getAll();
    }
}