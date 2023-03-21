import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// the resolver container here is used such that when
// a graphQL request for profile that contains the
// projects field, grpahQL would be able to parse that accurately
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
