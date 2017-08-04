export interface BaseData {
    getAll: Promise<T[]>;
    getById(id: string): Promise<T>;
    add(item: T): Promise<T>;
    findOne(quer?: any): Promise<T>;
}