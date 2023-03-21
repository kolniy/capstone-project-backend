import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const tokenSecret = process.env.JWTSECRET;

const signup = async (parent, { data }, context, info) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userExists) {
    throw new Error("user already exists");
  }

  const salt = await bcrypt.genSalt(8);
  const password = await bcrypt.hash(data.password, salt);

  const user = await prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: password,
      occupation: data.occupation.length > 0 ? data.occupation : "",
    },
  });

  const payload = {
    userId: user.id,
  };

  const token = await jwt.sign(payload, tokenSecret, { expiresIn: 360000 });

  return {
    user,
    token,
  };
};

const signin = async (parent, { data }, context, info) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("invalid credentials");
  }

  const valid = await bcrypt.compare(data.password, user.password);

  if (!valid) {
    throw new Error("invalid credentials");
  }

  const payload = {
    userId: user.id,
  };

  const token = jwt.sign(payload, tokenSecret);

  return {
    user,
    token,
  };
};

export { signup, signin };
