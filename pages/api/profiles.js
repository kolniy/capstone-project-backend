import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' });

    try {
        const prisma = new PrismaClient();
        const profiles = await prisma.profile.findMany();
        
        return res.status(200).json(profiles);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}