// server/db/users.js

import { prisma } from ".";
import bcrypt from "bcrypt";

export const createUser = (userData) => {
  const finalUserData = {
    ...userData,
    password: bcrypt.hashSync(userData.password, 10),
  };

  return prisma.user.create({
    data: finalUserData,
  });
};

export const updateUser = async (id, userData) => {
  console.log("GOT HERE: server/db/users.js");
  console.log("!!! userData", userData);
  const finalUserData = {
    ...userData,
  };

  if (userData.password && userData.password.trim() !== "") {
    finalUserData.password = bcrypt.hashSync(userData.password, 10);
  } else {
    delete finalUserData.password;
  }

  return prisma.user.update({
    where: { id },
    data: finalUserData,
  });
};

export const getUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
