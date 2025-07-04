import { db } from "./Model";
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