import  express, 
        { Request, Response} from "express";
const app = express();

app.get("/hello", (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(1234, () => {
    console.log('Connect to server With Nodemon');
});