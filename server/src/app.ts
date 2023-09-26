import express, {Request, Response, Router} from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import {register, login} from "./controller/auth"; 


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/register', register);
app.post('/login', login);



export default app;
