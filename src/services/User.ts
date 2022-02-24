import UserModels from '../models/UserModel';
import { IUser, IUser2 } from '../interfaces/User';
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
  if (!level) return prepareResponse(false, 400, { error: 'Level is required' });
  if (typeof level !== 'number') {
    return prepareResponse(false, 422, { error: 'Level must be a number' });
  }
  if (level < 1) return prepareResponse(false, 422, { error: 'Level must be greater than 0' });

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
  const usernameResp = validateUsername(user.username);
  const classeResp = validateClasse(user.classe);
  const levelResp = validateLevel(user.level);
  const passwordResp = validatePassword(user.password);

  if (!usernameResp.success) return usernameResp;
  if (!classeResp.success) return classeResp;
  if (!levelResp.success) return levelResp;
  if (!passwordResp.success) return passwordResp;

  const createdUser: IUser = await UserModels.create(user);
  const response = prepareResponse(true, 201, createdUser);
  
  return response;
};

export default {
  create,
};
