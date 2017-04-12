/**
 * Created by deepakkhetwal on 4/9/17.
 */
class Model {
    constructor(db, collectionName){
        this.name= collectionName;
        this.db= db;
    }
    async find(query){
        const result = await this.db.collection(this.name).find(query);
        if(!result){
            throw new Error('Db find error');
        }
        return result;
    }
}
module.exports = Model;
