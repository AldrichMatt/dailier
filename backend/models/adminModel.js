// ----------------------
// work in progress
// supposedly for administrator of the app
// ----------------------
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async () => {
  return await prisma.users.findMany(
    {select : 
      { id : true,
        email : true, 
        username : true,
        password : true,
      }
    }
  );
}