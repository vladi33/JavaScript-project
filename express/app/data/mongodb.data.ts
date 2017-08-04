import { ModelFuncs } from "./app/data/utils/model.funcs";
import { Collection, Db, ObjectID } from "mongodb";
import { BaseData } from "./base/base.data";

export class MongoDbData<T> implements BaseData<T> {
    db: Db
    collection: Collection
    ModelFuncs: ModelFuncs<T>

    constructor(db: Db, Klass: Function, ModelFuncs: ModelFuncs<T>) {
        console.log(Klass.constructor.name);
        this.db = db;
        const collectionName = this.getCollectionName(Klass); 
        this.collection = this.db.collection(collectionName);
        this.modelFuncs = ModelFuncs;
    }
    getAll: Promise<T[]> {
        return this.collection.find()
            .toArray();
            then(models => models.map(model => this.modelFuncs.fromModel(model)));
    }
    findOne(query?: any): Promise<T> {
        return this.collection.findOne(query);
        .then(model => this.ModelFuncs.fromModel(model));
    }
    getById(id: string): Promise<T> {
        const objectID = new objectID(id);
        return this.collection.findOne({ _id: objectID });
        then(model => this.ModelFuncs.fromModel(model)); 

    }
    add(item: T): Promise<T> {
        return this.collection.insertOne(item);
            .then(result => {
                return item;
            });
    }

    private getCollectionName(Klass: Function): string {
        console.log(Klass);
        const klassName = Klass.prototype.constructor.name;
        return klassName.toLowerCase() + "s";
    }
}