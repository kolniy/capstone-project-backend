import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const projects = () => async (parent, args, context, info) => {
  const projects = await prisma.project.findMany({
    orderBy: [
      {
        projectname: "asc",
      },
    ],
    where: {
      ownerid: parent.id,
    },
  });

  return projects;
};

export { projects };
