import jwt from 'jsonwebtoken';
import UserModels from '../models/UserModel';
import { IUser2, ILogin } from '../interfaces/User';
import { IResponse } from '../interfaces/Response';

const prepareResponse = (
  success: boolean,
  code: number,
  message: string | object,
): IResponse => ({
  success,
  code,
  message,
});

const secret = 'partiuTypeScript';

const validateUsername = (username: string): IResponse => {
  if (!username) return prepareResponse(false, 400, { error: 'Username is required' });
  if (typeof username !== 'string') {
    return prepareResponse(false, 422, { error: 'Username must be a string' });
  }
  if (username.length < 3) {
    return prepareResponse(false, 422, { error: 'Username must be longer than 2 characters' });
  }

  return prepareResponse(true, 250, '');
};

const validateClasse = (classe: string): IResponse => {
  if (!classe) return prepareResponse(false, 400, { error: 'Classe is required' });
  if (typeof classe !== 'string') {
    return prepareResponse(false, 422, { error: 'Classe must be a string' });
  }
  if (classe.length < 3) {
    return prepareResponse(false, 422, { error: 'Classe must be longer than 2 characters' });
  }

  return prepareResponse(true, 250, '');
};

const validateLevel = (level: number): IResponse => {
  if (level < 1) return prepareResponse(false, 422, { error: 'Level must be greater than 0' });
  if (!level) return prepareResponse(false, 400, { error: 'Level is required' });
  if (typeof level !== 'number') {
    return prepareResponse(false, 422, { error: 'Level must be a number' });
  }

  return prepareResponse(true, 250, '');
};

const validatePassword = (password: string): IResponse => {
  if (!password) return prepareResponse(false, 400, { error: 'Password is required' });
  if (typeof password !== 'string') {
    return prepareResponse(false, 422, { error: 'Password must be a string' });
  }
  if (password.length < 9) {
    return prepareResponse(false, 422, { error: 'Password must be longer than 7 characters' });
  }

  return prepareResponse(true, 250, '');
};

const create = async (user: IUser2): Promise<IResponse> => {
  const { username, classe, level, password } = user;
  const usernameResp = validateUsername(username);
  const classeResp = validateClasse(classe);
  const levelResp = validateLevel(level);
  const passwordResp = validatePassword(password);

  if (!usernameResp.success) return usernameResp;
  if (!classeResp.success) return classeResp;
  if (!levelResp.success) return levelResp;
  if (!passwordResp.success) return passwordResp;

  await UserModels.create(user);
  const token = jwt.sign({ username, password }, secret);
  const response = prepareResponse(true, 201, { token });
  
  return response;
};

const validateLogin = (users: Array<ILogin>, user: ILogin): IResponse => {
  const { username, password } = user;
  const validate = users
    .some((u: ILogin): boolean => u.username === username && u.password === password);
  if (!validate) return prepareResponse(false, 401, { error: 'Username or password invalid' });

  return prepareResponse(true, 250, '');
};

const login = async (user: ILogin): Promise<IResponse> => {
  const { username, password } = user;
  const usernameResp = validateUsername(username);
  const passwordResp = validatePassword(password);

  if (!usernameResp.success) return usernameResp;
  if (!passwordResp.success) return passwordResp;

  const users = await UserModels.getAll();
  const loginResp = validateLogin(users, user);
  if (!loginResp.success) return loginResp;

  const token = jwt.sign({ username, password }, secret);

  return prepareResponse(true, 200, { token });
};

export default {
  create,
  login,
};
