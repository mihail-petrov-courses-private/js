import { Service } from "../interfaces/service.interface";
import { TaskModel } from '../models/task.model';
import { DatabaseService } from "../system/database.service";

export class TaskService implements Service<TaskModel> {

    private readonly TABLE = `td_tasks`;

    public async getAll(): Promise<any> {

        return DatabaseService.getConnection().query(`
            SELECT * FROM ${this.TABLE}
        `);
    }
    public async get(id: number): Promise<any> {

        return await DatabaseService.getConnection().query(`
            SELECT * FROM ${this.TABLE}
            WHERE id = ${id}
        `);
    }
    public async create(model: TaskModel): Promise<any> {

        return await DatabaseService.getConnection().query(`
            INSERT INTO ${this.TABLE}(content, status, priority)
            VALUES(${model.content}, ${model.status}, ${model.priority});
        `);
    }
    public async update(id: number, model: TaskModel): Promise<any> {

        return await DatabaseService.getConnection().query(`
            UPDATE ${this.TABLE} 
                SET content  = ${model.content},
                    status   = ${model.status}
                    priority = ${model.priority}
            WHERE 
                id = ${id};
        `);
    }
    public async delete(id: number): Promise<any> {
        
        return await DatabaseService.getConnection().query(`
            DELETE FROM ${this.TABLE}
            WHERE id = ${id};
        `);
    }
}