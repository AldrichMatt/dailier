import { PrismaClient } from "@prisma/client";
import { getTimestamps } from "./abstract.js";

const prisma = new PrismaClient();

export const getAllUser = async () => {
  return await prisma.users.findMany({
    select : { 
      id : true,
      email : true, 
      username : true
    }
  }
);
}

export const getUserbyEmail = async (email) => {
  return await prisma.users.findUnique({
    select : {
      id : true,
      username : true,
      email : true
    },
    where : {
      email : {
        equal : email
      }
    }
  })
}

export const registerUser = (username, email, password) => {
  const created_at = getTimestamps().created_at;
  return prisma.users.create({
    data: {
      email : email,
      username : username,
      password : password,
      created_at : created_at
    },
    select :{
      id : true,
      username : true,
      email : true
    }
  })
}
