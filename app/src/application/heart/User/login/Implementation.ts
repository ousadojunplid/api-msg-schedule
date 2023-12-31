import { LoginRepository_I, resultInfo_I } from "./Repository";
import { PrismaCore } from "../../../implementations/core";

export class LoginImplementation
  extends PrismaCore
  implements LoginRepository_I
{
  async getInfo(email: string): Promise<resultInfo_I | null> {
    try {
      return await this.prismaClient.users.findUnique({
        where: { email },
        select: {
          full_name: true,
          password: true,
          id: true,
          due_date: true,
          type: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Erro dataBase.");
    }
  }
}
