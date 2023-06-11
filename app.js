
const express = require('express')
const connection = require('./database/db-query')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  //const result = connection.query('SELECT * FROM event_table')
  //console.log(result, 'table from event')
  connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
})
