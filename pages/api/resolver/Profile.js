// the resolver container here is used such that when
// a graphQL request for profile that contains the
// projects field, grpahQL would be able to parse that accurately
export const project = async (parent, args, { prisma }, info) => {
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
