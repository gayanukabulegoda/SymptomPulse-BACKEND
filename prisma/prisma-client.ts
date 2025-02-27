import {PrismaClient} from "@prisma/client";
/**
 * @description Prisma client instance for database operations
 * @exports prismaClientInstance
 */
const prismaClientInstance = new PrismaClient();

export default prismaClientInstance;