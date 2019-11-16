const db = require('../database/dbConfig');

module.exports = {
    insert,
    findBy
};

function findBy(filter) {
    return db('users')
    .where(filter)
};

function insert(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        const id = ids[0]
        return db('users')
        .where({ id })
        .first()
    })
};