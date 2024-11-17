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

  // Sales Endpoint
  app.get('/metrics/sales', async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const sales = await salesMetrics.getSalesByDate(startDate, endDate);
      res.send(sales);
    } catch (error) {
      if (error.message === 'Invalid Date Format' || error.message === 'Invalid time period') {
        res.status(400).send(error.message);
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  });

  // User Sales Endpoint
  app.get('/metrics/sales/users', async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const userSales = await salesMetrics.getUserSalesByMonth(startDate, endDate);
      res.send(userSales);
    } catch (error) {
      if (error.message === 'Invalid Date Format' || error.message === 'Invalid time period') {
        res.status(400).send(error.message);
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  });

  // Group Sales Endpoint
  app.get('/metrics/sales/groups', async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      const groupSales = await salesMetrics.getGroupSalesByMonth(startDate, endDate);
      res.send(groupSales);
    } catch (error) {
      if (error.message === 'Invalid Date Format' || error.message === 'Invalid time period') {
        res.status(400).send(error.message);
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  });

  app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST}:${PORT}`);
}

start();
