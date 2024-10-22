// server/api/auth/user.put.js
import { sendError } from "h3";
import { updateUser } from "../../db/users.js"; // Use an update method
import { userTransformer } from "~/server/transformers/user.js";

export default defineEventHandler(async (event) => {
  const authUser = event.context.auth?.user;

  if (!authUser) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Unauthorized" }));
  }

  const body = await readBody(event);
  const { username, password, name, email, profileImage } = body;

  if (!username || !email || !name) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid params" }));
  }

  const updatedUser = await updateUser(authUser.id, {
    username,
    password,
    email,
    name,
    profileImage,
  });

  return {
    user: userTransformer(updatedUser),
  };
});
