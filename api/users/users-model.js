const db = require("../../data/db-config");

function getAll() {
    return db('users').select(
        "user_id", "username", "email", "avatar_url");
}

async function getById(id) {
    const user = await db("users").where("user_id", id).first();
    return user;
}

function getByFilter(filter) {
    return db('users')
    .where(filter);
}

async function remove(id) {
    const count = await db("users").where("user_id", id).delete();
    return count;
}

async function create(payload) {
    const [insertedUser] = await db("users").insert(payload);
    return getById(insertedUser);

}

async function update(id, payload) {
    const count = await db("users").where("user_id", id).update(payload);
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