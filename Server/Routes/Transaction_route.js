import express from 'express';
import UserAuth from '../MiddleWare/Auth.js';
import { createtranction, deleteTransaction, gettranction } from '../Controller/TransactionController.js';

const route = express.Router();
route.post('/create',UserAuth,createtranction);
route.get('/get-list',UserAuth,gettranction);
route.delete('/:id',UserAuth,deleteTransaction);
export default route;