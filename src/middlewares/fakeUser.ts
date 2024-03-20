import { UserRequest } from "types/types";
import { Response, NextFunction } from "express";

export const fakeUser = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  req.user = {
    _id: "65faeda3750ff8eb846538d3",
  };

  next();
};
