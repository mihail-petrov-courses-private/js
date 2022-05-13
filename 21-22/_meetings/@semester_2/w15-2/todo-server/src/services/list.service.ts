import { ListModel          } from "../models/list.model";
import { DatabaseService    } from "../system/database.service";
import { Service            } from "../interfaces/service.interface";

export class ListService implements Service<ListModel> {

    private readonly TABLE = "td_lists";

    public async getAll() {

        return await DatabaseService.getConnection().query(`
            SELECT * FROM ${this.TABLE}
        `);
    }

    public async get(id: number) {

        return await DatabaseService.getConnection().query(`
            SELECT * FROM ${this.TABLE}
            WHERE id = ${id}
        `);
    }

    public async create(model: ListModel) {

        return await DatabaseService.getConnection().query(`
            INSERT INTO ${this.TABLE}(title, type)
            VALUES(${model.title}, ${model.type});
        `);
    }

    public async update(id: number, model: ListModel) {

        return await DatabaseService.getConnection().query(`
            UPDATE ${this.TABLE} 
                SET title = ${model.title},
                    type = ${model.type}
            WHERE 
                id = ${id};
        `);
    }

    public async delete(id: number) {
        
        return await DatabaseService.getConnection().query(`
            DELETE FROM ${this.TABLE}
            WHERE id = ${id};
        `);
    }
}