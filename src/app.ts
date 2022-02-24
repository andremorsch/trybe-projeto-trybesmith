import express from 'express';
import UserController from './controller/User';
import ProductController from './controller/Product';

const app = express();

app.use(express.json());

app.post('/users', UserController.create);

app.post('/login', UserController.login);

app.post('/products', ProductController.create);

export default app;
