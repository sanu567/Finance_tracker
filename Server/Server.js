import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './Config/ConnectDB.js';
import Auth from './Routes/Auth.js'
import Transaction from './Routes/Transaction_route.js'


const app = express();
const port = 4001 || process.env.PORT;

connectDB();
const allowedOrigins=['https://finance-tracker-frontend-l66y.onrender.com','http://localhost:5173']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}));

app.get("/",(req,resp)=>resp.send("Api is working still fine"));
app.use('/api/auth',Auth);
app.use('/api/transaction',Transaction)

app.listen(port,()=>console.log(`server is running on ${port}`))

