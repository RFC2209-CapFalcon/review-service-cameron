const db = require('../db');
const { createIndex } = require('../../scripts')

const addIndex = (indexName, table, column) => {
  return db.query(`
    CREATE INDEX $1
    ON $2 ($3);
  `, [indexName, table, column])
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err);
    });
};

addIndex(createIndex)