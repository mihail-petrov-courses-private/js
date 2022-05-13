import  express from "express";
import { routerReference } from './api/list.api';

const app = express();

app.use(express.json());

app.use('/api/list', routerReference);

app.listen(1234, () => {
    console.log('Connect to server With Nodemon');
});