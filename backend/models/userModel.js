import { PrismaClient } from "@prisma/client";
import { getTimestamps } from "./abstract.js";

const prisma = new PrismaClient();

export const getAll = async () => {
  return await prisma.users.findMany({
    select : { 
      id : true,
      email : true, 
      username : true
    }
  }
);
}

export const getById = async (id) => {
  return await prisma.users.findUnique({
    select : {
      id : true,
      username : true,
      email : true
    },
    where : {
      id : id
    }
  })
}

export const getByEmail = async (email) => {
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



export const create = (username, email, password) => {
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

export const update = (user_id, username, email, password) => {
  const updated_at = getTimestamps().updated_at;
  return prisma.users.create({
    data: {
      email : email,
      username : username,
      password : password,
      updated_at : updated_at
    },
    where :{
      id : user_id
    },
    select :{
      id : true,
      username : true,
      email : true
    }
  })
}
