import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_ADMIN;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRY_ADMIN;
const JWT_REFRESH_SECRET_ADMIN = process.env.JWT_REFRESH_SECRET_ADMIN;
const JWT_REFRESH_EXPIRY_ADMIN = process.env.JWT_REFRESH_EXPIRY_ADMIN;

export function generateAccessTokenAdmin(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAccessTokenAdmin(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function generateRefreshTokenAdmin(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET_ADMIN, {
    expiresIn: JWT_REFRESH_EXPIRY_ADMIN,
  });
}

export function verifyRefreshTokenAdmin(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET_ADMIN);
  } catch {
    return null;
  }
}
