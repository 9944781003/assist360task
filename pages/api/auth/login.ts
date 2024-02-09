// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import cookie from "cookie";

bcrypt.compare("password", "", function (err, result) {});
const prisma = new PrismaClient();

interface MyApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}
type UserWithToken = User | { message: string };
interface MyNextApiResponse extends NextApiResponse<UserWithToken> {}

export default async function handler(
  req: MyApiRequest,
  res: NextApiResponse<UserWithToken>
) {
  try {
    if (!req.body.email) throw new Error("Email is required");
    if (!req.body.password) throw new Error("Password is required");
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      include: {
        role: true,
      },
    });

    if (user === null) {
      throw new Error("User not found");
    } else if (
      user &&
      !(await bcrypt.compare(req.body.password, user.password))
    ) {
      throw new Error("Password is incorrect");
    }
    let jwt = JWT.sign(
      { id: user.id, role: user.role.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("token", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
          sameSite: "strict",
          maxAge: 3600, // 1 hour
          path: "/",
        })
      )
      .status(200)
      .json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
