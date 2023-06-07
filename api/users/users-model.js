const db = require('../../data/db-config');

function getAll() {
    return db('Users').select("id", "name", "username", "email");
}

function getById(id) {
    return db('Users')
    .where("id", id)
    .select("id", "name", "username", "email")
    .first();
}

function getByFilter(filter) {
    return db('Users')
    .where(filter);
}

async function remove(id) {
    const count = await db('Users').where("id", id).delete();
    return count;
}

async function create(payload) {
    const [id] = await db('Users').insert(payload);
    return getById(id);

}

async function update(id, payload) {
    const count = await db('Users').where("id", id).update(payload);
    return count;   
}

module.exports = {
    getAll, 
    getById, 
    getByFilter, 
    remove,
    create, 
    update,
} 