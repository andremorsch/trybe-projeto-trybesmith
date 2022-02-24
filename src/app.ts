import express from 'express';
import UserController from './controller/User';

const app = express();

app.use(express.json());

app.post('/users', UserController.create);

app.post('/login', UserController.login);

export default app;
