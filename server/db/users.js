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

export const updateUser = async (userId, userData) => {
  // Your logic to update user in the database
  // For example:
  const { name, username, email } = userData;
  // Perform the update operation using your database client
  return;
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
