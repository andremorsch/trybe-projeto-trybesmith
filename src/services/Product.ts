import jwt from 'jsonwebtoken';
import { IProduct } from '../interfaces/Product';
import { IResponse } from '../interfaces/Response';
import productModel from '../models/ProductModel';

const secret = 'partiuTypeScript';

const prepareResponse = (
  success: boolean,
  code: number,
  message: string | object,
): IResponse => ({
  success,
  code,
  message,
});

const validateName = (name: string): IResponse => {
  if (!name) return prepareResponse(false, 400, { error: 'Name is required' });
  if (typeof name !== 'string') {
    return prepareResponse(false, 422, { error: 'Name must be a string' });
  }
  if (name.length < 3) {
    return prepareResponse(false, 422, { error: 'Name must be longer than 2 characters' });
  }

  return prepareResponse(true, 250, '');
};

const validateAmount = (amount: string): IResponse => {
  if (!amount) return prepareResponse(false, 400, { error: 'Amount is required' });
  if (typeof amount !== 'string') {
    return prepareResponse(false, 422, { error: 'Amount must be a string' });
  }
  if (amount.length < 3) {
    return prepareResponse(false, 422, { error: 'Amount must be longer than 2 characters' });
  }

  return prepareResponse(true, 250, '');
};

const validateToken = (auth: string | undefined): IResponse => {
  try {
    if (typeof auth === 'undefined') {
      return prepareResponse(false, 401, { error: 'Token not found' });
    }
    const token = jwt.verify(auth, secret);
    return prepareResponse(true, 250, { token });
  } catch (e: unknown) {
    return prepareResponse(false, 401, { error: 'Invalid token' });
  }
};

const create = async (product: IProduct): Promise<IResponse> => {
  const { name, amount } = product;

  const nameResp = validateName(name);
  const amountResp = validateAmount(amount);

  if (!nameResp.success) return nameResp;
  if (!amountResp.success) return amountResp;

  const createdProd = await productModel.create(product);

  return prepareResponse(true, 201, { item: createdProd });
};

const getAll = async (): Promise<IResponse> => {
  const allProds = await productModel.getAll();
  const response = prepareResponse(true, 200, allProds);
  
  return response;
};

export default {
  create,
  getAll,
  validateToken,
};
