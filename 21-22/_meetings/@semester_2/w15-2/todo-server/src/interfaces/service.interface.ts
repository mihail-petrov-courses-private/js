export interface Service<T> {

    getAll(): Promise<any>;
    get(id: number): Promise<any>;
    create(model: T): Promise<any>;
    update(id: number, model: T): Promise<any>;
    delete(id: number): Promise<any>;
}