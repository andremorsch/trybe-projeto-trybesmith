import { Request, Response } from 'express';
import userServices from '../services/User';
import { IUser2 } from '../interfaces/User';
import { IResponse } from '../interfaces/Response';

const create = async (req: Request, res: Response) => {
  const { username, classe, level, password } = req.body;
  const userToCreate: IUser2 = { username, classe, level, password };
  const createdUser: IResponse = await userServices.create(userToCreate);

  res.status(createdUser.code).json(createdUser.message);
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const makeLogin = await userServices.login({ username, password });

  res.status(makeLogin.code).json(makeLogin.message);
};

export default {
  create,
  login,
};
