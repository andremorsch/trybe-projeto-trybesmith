import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IProduct } from '../interfaces/Product';

const create = async (product: IProduct) => {
  const { name, amount } = product;
  const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
  const [result] = await connection.execute<ResultSetHeader>(query, [name, amount]);
  const { insertId: id } = result;

  const insertedProd = { id, name, amount };

  return insertedProd;
};

const getAll = async () => {
  const query = 'SELECT * FROM Trybesmith.Products';
  const [result] = await connection.execute<ResultSetHeader>(query);
  return result;
};

export default {
  create,
  getAll,
};
