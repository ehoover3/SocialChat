import { sendError } from "h3";
import { createUser } from "../../db/users.js";
import { userTransformer } from "~~/server/transformers/user.js";

import { generateTokens, sendRefreshToken } from "../../utils/jwt.js";
import { createRefreshToken } from "../../db/refreshTokens.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password, repeatPassword, name } = body;
  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid params" }));
  }
  if (password !== repeatPassword) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Passwords do not match" }));
  }
  const userData = {
    username,
    email,
    password,
    name,
    profileImage: "https://picsum.photos/200/200",
  };
  const user = await createUser(userData);
  const { accessToken, refreshToken } = generateTokens(user);
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
