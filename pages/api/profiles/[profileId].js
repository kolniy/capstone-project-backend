import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

    const prisma = new PrismaClient();
    const { profileId } = req.query;
    const method = req.method;


    switch (method) {
        case 'GET':
            const profile = await prisma.profile.findFirst({
                where: {
                  id: profileId,
                }
              });
            res.status(200).json(profile);
            break;
        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
}