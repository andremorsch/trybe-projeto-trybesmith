import { ResultSetHeader } from 'mysql2';

import connection from './connection';

import { IUser, IUser2 } from '../interfaces/User';

// const getAll = async (): Promise<User[]> => {
//   const [data] = await connection.execute('SELECT username, email FROM Users');
//   return data as IUser[];
// };

// const getById = async (id: number): Promise<IUser> => {
//   const [data] = await connection.execute('SELECT username, email FROM Users WHERE id=?', [id]);
//   const [row] = data as IUser[];

//   return row;
// };

const create = async (user: IUser2): Promise<IUser> => {
  const { username, classe = '', level, password } = user;
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)', 
    [username, classe, level, password],
  );
  const { insertId: id } = result;

  const insertedUser: IUser = { id, username, classe, level, password };

  return insertedUser;
};

// const update = async (id: number, user: IUser): Promise<IUser> => {
//   const { username, email, password } = user;
  
//   await connection.execute(
//     'UPDATE users SET username=?, email=?, password=?, createdAt=?, updatedAt=? WHERE id=?', 
//     [username, email, password, new Date(), new Date(), id],
//   );
  
//   const updatedUser: User = { id, username, email, password };

//   return updatedUser;
// };

// const remove = async (id: number): Promise<void> => {
//   await connection.execute(
//     'DELETE FROM users WHERE id=?', 
//     [id],
//   );
// };

export default {
  // getAll,
  // getById,
  create,
  // update,
  // remove,
};

// Model inicial baseado no que foi passado pelo Renato Filho