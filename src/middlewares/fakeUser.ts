import { Response, NextFunction } from 'express';
import { UserRequest } from '../types/types';

const fakeUser = (req: UserRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65faeda3750ff8eb846538d3',
  };

  next();
};

export default fakeUser;
