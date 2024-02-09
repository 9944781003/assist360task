// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

interface MyApiRequest extends NextApiRequest {
  body: Prisma.UserFindManyArgs;
}

export default async function handler(
  req: MyApiRequest,
  res: NextApiResponse<User[]>
) {
  const where = { ...req.body.where };
 
  const users = await prisma.user.findMany({
    ...req.body,
    where: {
      ...where,
      role: {
        name: {
          notIn: ["Super Admin"],
          
        },
      }
     
     
    },
    include: {
      role: true,
      department: true,
    },
  });
  res.status(200).json(users);
}
