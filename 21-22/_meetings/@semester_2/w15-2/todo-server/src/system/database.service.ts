import mysql, { Connection } from "mysql";

export class DatabaseService {

    private dbConnection: Connection = null;
    private static connectionInstance: DatabaseService;

    private constructor() {

        this.dbConnection = mysql.createConnection({
            host        : "localhost",
            user        : "root",
            password    : "",
            database    : "todo_app"
        });
    }

    public static getConnection(): DatabaseService {

        if(this.connectionInstance) {
           return this.connectionInstance; 
        }

        this.connectionInstance = new DatabaseService();
        return this.connectionInstance;
    }

    public query(query: string) {

        return new Promise((resolver, rejector) => {
            this.dbConnection.query(query, (error, collection) => {

                if(error) {
                    return rejector(error);
                }

                return resolver(collection);
            })
        })
    }

}