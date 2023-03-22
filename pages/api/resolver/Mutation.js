import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.JWTSECRET;

const signup = async (parent, { data }, { prisma }, info) => {
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

const signin = async (parent, { data }, { prisma }, info) => {
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

const createProfile = async (parent, { data }, { prisma }, info) => {
  const profile = await prisma.profile.findUnique({
    where: {
      email: data.email,
    },
  });

  if (profile) {
    throw new Error("Profle already exists");
  }

  const newProfile = await prisma.profile.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      about: data.about,
      photo: data.photo,
      address: data.address,
      github: data.github,
      linkedin: data.linkedin,
      phone: data.phone,
      skills: data.skills.split(","),
    },
  });

  return newProfile;
};

const createProject = async (parent, { profileId }, { prisma }, info) => {
  return "some one cannot play with you";
};

export { signup, signin, createProfile, createProject };
