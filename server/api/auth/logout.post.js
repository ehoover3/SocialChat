// server/api/auth/logout.post.js
import { removeRefreshToken } from "~~/server/db/refreshTokens";
import { sendRefreshToken } from "~~/server/utils/jwt";
import { getCookie } from "h3";

export default defineEventHandler(async (event) => {
  console.log("GOT HERE: server/api/auth/logout.post.js");

  // Get the refresh token from cookies
  const refreshToken = getCookie(event, "refresh_token");

  // Check if the refresh token exists
  if (!refreshToken) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "No refresh token found" }));
  }

  // Remove the refresh token from the database
  try {
    await removeRefreshToken(refreshToken);
  } catch (error) {
    console.error("Error removing refresh token:", error);
    return sendError(event, createError({ statusCode: 500, statusMessage: "Error during logout" }));
  }

  // Send a null refresh token to clear the cookie
  // sendRefreshToken(event.node.res, null);
  sendRefreshToken(event, null);
  return { message: "Done" };
});
