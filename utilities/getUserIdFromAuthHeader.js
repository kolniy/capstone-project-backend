import jwt from "jsonwebtoken";
const tokenSecret = process.env.JWTSECRET;

const getIdFromToken = (token) => {
  return jwt.verify(token, tokenSecret);
};

const getUserIdFromAuthHeader = (req) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getIdFromToken(token);
      return userId;
    } else {
      throw new Error("Not authenticated");
    }
  }
};

export { getUserIdFromAuthHeader };
