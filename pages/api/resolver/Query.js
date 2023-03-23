const hello = async (parent, args, context, info) => {
  return "Hello world";
};

const getProfiles = async (parent, args, { userId, prisma }, info) => {
  // if (!userId) {
  //   throw new Error("not authorized, invalid token");
  // }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // if (!user) {
  //   throw new Error("not authorized");
  // }

  const profiles = await prisma.profile.findMany({});
  return profiles;
};

const getProfile = async (parent, { profileId }, { userId, prisma }, info) => {
  // if (!userId) {
  //   throw new Error("not authorized, invalid token");
  // }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // if (!user) {
  //   throw new Error("not authorized");
  // }

  const profile = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
  });

  return profile;
};

const filterProfiles = async (parent, { fname, lname }, { prisma }, info) => {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        {
          firstname: { contains: fname, mode: "insensitive" },
        },
        {
          lastname: { contains: lname, mode: "insensitive" },
        },
      ],
    },
  });
  return profiles;
};

export { hello, getProfiles, getProfile, filterProfiles };
