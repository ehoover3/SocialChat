import { sendError } from "h3";
import { updateUser } from "../../db/users.js";
import { userTransformer } from "~~/server/transformers/user.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, username, email } = body;

  if (!name || !username || !email) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid params" }));
  }

  const userId = event.context.auth.user.id; // Assuming you have auth context
  const updatedUser = await updateUser(userId, { name, username, email });

  return {
    user: userTransformer(updatedUser),
  };
});
