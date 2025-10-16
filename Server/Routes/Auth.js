import express from 'express'
import { login, logout, Register } from '../Controller/Authcontroller.js';

const route = express.Router();
route.post('/register',Register);
route.post('/login',login);
route.post('/logout',logout);
export default route;