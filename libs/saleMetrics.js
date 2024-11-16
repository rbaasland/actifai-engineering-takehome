'use strict';

const { Client } = require('pg');
const pgclient = new Client({
  host: 'db',
  port: '5432',
  user: 'user',
  password: 'pass',
  database: 'actifai'
});

pgclient.connect();

/**
 * Get total sales by day over a time period
 * @param {string} startDate The first number to add.
 * @param {string} endDate The second number to add.
 * @return {object} Total sales by day
 */    
const getSalesByDate = async function(startDate, endDate ) {
    if (endDate < startDate) {
        throw new Error('Invalid time period');
    }
    try {
        const queryText = `
            SELECT 
                to_char(date, 'yyyy-mm-dd') as date,
                sum(amount) as total
            FROM sales 
            WHERE
                date >= $1 and date <= $2
            GROUP BY date
            ORDER BY date ASC`;
        const params = [startDate, endDate];
        const results = await pgclient.query(queryText, params);
        return results.rows;
    } catch(error) {
        throw new Error('Query error');
    }
}

module.exports = {
    getSalesByDate,
    getUserSalesByMonth
}