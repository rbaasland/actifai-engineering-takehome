'use strict';

const express = require('express');
const seeder = require('./seed');
const salesMetrics = require('./libs/saleMetrics')

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

async function start() {
  // Seed the database
  await seeder.seedDatabase();

  // App
  const app = express();

  // Health check
  app.get('/health', (req, res) => {
    res.send('Hello World');
  });

  // Total sales over a period of time Endpoint
  app.get('/metrics/sales', async (req, res) => {
    const date = new Date();
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
      const sales = await salesMetrics.getSalesByDate(startDate, endDate);
      res.send(sales);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

  // Total sales / average sales over a period of time by user Endpoint
  app.get('/metrics/sales/users', async (req, res) => {
    const date = new Date();
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
      const userSales = await salesMetrics.getUserSalesByMonth(startDate, endDate);
      res.send(userSales);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}

start();
