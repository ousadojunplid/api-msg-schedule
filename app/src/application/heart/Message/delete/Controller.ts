import { Request, Response } from "express";
import { DellMessageOfUserDTO_I } from "./DTO";
import { DellMessageOfUserUseCase } from "./UseCase";
import { ValidationError } from "express-validation";

export const DellMessageOfUserController = (
  dellMessageOfUserUseCase: DellMessageOfUserUseCase
) => {
  const execute = async (
    req: Request<DellMessageOfUserDTO_I, any, { userId: number }>,
    res: Response
  ): Promise<Response> => {
    try {
      const data = await dellMessageOfUserUseCase.run(
        { id: req.params.id },
        req.body.userId
      );
      return res.status(200).json(data);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode ?? 500).json(error.details ?? error);
      }
      return res.status(500).json(error);
    }
  };

  return { execute };
};
