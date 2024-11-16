'use strict';

const database = require('./database');

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
    const results = await database.executeQuery(queryText, params);
    return results.rows;
}

/**
 * Get total sales by day over a time period
 * @param {string} startDate The first number to add.
 * @param {string} endDate The second number to add.
 * @return {object} Total sales by day
 */    
const getUserSalesByMonth = async function(startDate, endDate ) {
    if (endDate < startDate) {
        throw new Error('Invalid time period');
    }

    const queryText = `
        SELECT
            s.user_id,
            u.name,
            to_char(date_trunc('month', s.date), 'yyyy-mm-dd') as sales_month,
            sum(s.amount) as total_sales,
            ROUND(AVG(s.amount), 2) as average_sale
        FROM sales s
        LEFT JOIN users u ON s.user_id = u.id
        WHERE
            s.date >= $1 and s.date <= $2
        GROUP BY
            sales_month, 
            s.user_id,
            u.name
        ORDER BY
            sales_month ASC,
            s.user_id ASC`;
    const params = [startDate, endDate];
    const results = await database.executeQuery(queryText, params);
    return results.rows;
}

/**
 * Get total sales by day over a time period
 * @param {string} startDate The first number to add.
 * @param {string} endDate The second number to add.
 * @return {object} Total sales by day
 */    
const getGroupSalesByMonth = async function(startDate, endDate ) {
    if (endDate < startDate) {
        throw new Error('Invalid time period');
    }

    const queryText = `
        SELECT
            ug.group_id,
            g.name,
            to_char(date_trunc('month', s.date), 'yyyy-mm-dd') as sales_month,
            sum(s.amount) as total_sales,
            ROUND(AVG(s.amount), 2) as average_sale
        FROM sales s
        INNER JOIN users u ON s.user_id = u.id
        INNER JOIN user_groups ug ON u.id = ug.user_id
        INNER JOIN groups g ON ug.group_id = g.id
        WHERE
            s.date >= $1 and s.date <= $2
        GROUP BY 1,2,3`;
    const params = [startDate, endDate];
    const results = await database.executeQuery(queryText, params);
    return results.rows;
}

module.exports = {
    getSalesByDate,
    getUserSalesByMonth,
    getGroupSalesByMonth
}