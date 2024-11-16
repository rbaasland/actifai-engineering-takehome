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

