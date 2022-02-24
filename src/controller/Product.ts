import { Request, Response } from 'express';
import { IProduct } from '../interfaces/Product';
import productService from '../services/Product';

const create = async (req: Request, res: Response) => {
  const { name, amount } = req.body;
  const { authorization } = req.headers;

  const tokenResp = await productService.validateToken(authorization);
  
  if (!tokenResp.success) {    
    res.status(tokenResp.code).json(tokenResp.message);
  } else {
    const prodToCreate: IProduct = { name, amount };
    const createdProd = await productService.create(prodToCreate);
    res.status(createdProd.code).json(createdProd.message);
  }
};

const getAll = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const tokenResp = await productService.validateToken(authorization);

  if (!tokenResp.success) {    
    res.status(tokenResp.code).json(tokenResp.message);
  } else {
    const allProds = await productService.getAll();
    res.status(allProds.code).json(allProds.message);
  }
};

export default {
  create,
  getAll,
};
