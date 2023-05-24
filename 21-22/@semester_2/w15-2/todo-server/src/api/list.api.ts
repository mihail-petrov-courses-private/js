import express, { Request, Response} from "express";
import { ListService } from "../services/list.service";

const listService           = new ListService();
export const routerReference = express.Router();

routerReference.get('/', async (request: Request, response: Response) => {

    try {
        const collection = await listService.getAll();
        response.status(200).json(collection);
    }
    catch(error) {
        console.log(error);
        response.status(404).json({ "message": "Data not found"});
    }
});

routerReference.get('/:id', async (request: Request, response: Response) => {

    try {
        const listId        = request.query.listid;
        const collection    = await listService.get(+listId);
        response.status(200).json(collection);
    }
    catch(error) {
        response.status(404).json({"message": "Data not found"});
    }
});

routerReference.post('/', async (request: Request, response: Response) => {

    try {
        await listService.create(request.body);
        response.status(200).json({"message": "Created successfuly"});
    }
    catch(error) {
        response.status(404).json({"message": "Operation failed"});
    }
});

routerReference.put('/:id', async (request: Request, response: Response) => {
    try {

        const listId        = request.query.listid;
        await listService.update(+listId, request.body);
        response.status(200).json({"message": "Created successfuly"});
    }
    catch(error) {
        response.status(404).json({"message": "Operation failed"});
    }
});

routerReference.delete('/:id', async (request: Request, response: Response) => {
    
    try {

        const listId        = request.query.listid;
        await listService.delete(+listId);
        response.status(200).json({"message": "Created successfuly"});
    }
    catch(error) {
        response.status(404).json({"message": "Operation failed"});
    }
});