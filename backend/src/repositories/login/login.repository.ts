import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class LoginRepository {
  async login(id: number, password: string): Promise<string | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = jwt.sign(
          { userId: user.id, email: user.email, id_hotel: user.id_hotel },
          process.env.TOKEN_SECRET as string
        );

        return token;
      }
    }

    return null;
  }
}
