const db = require('../db');
const { createIndex } = require('../../config')

const createIndexOnTable = (configObj) => {
  const { indexName, table, column } = configObj;

  return db.query(`
    CREATE INDEX $1
    ON $2 ($3);
  `, [ indexName, table, column ])
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err);
    });
}


const addIndexes = (createIndex) => {
  createIndex.forEach(index => {
    createIndexOnTable(index)
  })
};

addIndexes(createIndex)