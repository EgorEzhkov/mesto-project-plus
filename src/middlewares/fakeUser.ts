import { Response, NextFunction } from 'express';
import { UserRequest } from '../types/types';

const fakeUser = (req: UserRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6601791d87a0dc85289e6088',
  };

  next();
};

export default fakeUser;
