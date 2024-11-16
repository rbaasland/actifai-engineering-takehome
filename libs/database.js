'use strict';
const { Client } = require('pg');

const executeQuery = async (query, params ) => {
    return await pgQuery(query, params);
};

async function pgQuery(query, params) {
    const pgclient = new Client({
        host: 'db',
        port: '5432',
        user: 'user',
        password: 'pass',
        database: 'actifai'
    });

    try {
        pgclient.connect();
    } catch(error) {
        throw new Error('Database connection error' + JSON.stringify(error));
    }

    try {
        const response = await pgclient.query({
            text: query,
            values: params
        })
        await pgclient.end();
        return response;
    } catch(error) {
        throw new Error('Database query error: ' + JSON.stringify(error));
    }
};

module.exports = {
    executeQuery
}