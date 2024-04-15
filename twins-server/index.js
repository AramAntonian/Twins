const mysql = require('mysql2');
const http = require('http');
const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json())


let connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'Mari',
  password: 'Mari123',
  database: 'db',
});

app.listen(3002, () => console.log('Server running on port 3002'));

app.post('/', (req, res) => {
  (async function () {
    const { phone, password } = req.body
    console.log(phone, password);
    const query = `SELECT * FROM USERS WHERE phone = '${phone}' AND password = '${password}'`
    connection.query(query, (err, result) => {
      if (err) {
        res.send({ error: err.message })
      } else {
        console.log(result)
        res.send(result)
      }
    })
  })()
})

app.put('/', (req, res) => {
  (async function () {
    const { fullName, phone, password } = req.body
    const cards = []
    const query = `INSERT INTO USERS (fullName, phone, password, cards, email) VALUES ('${fullName}', '${phone}', '${password}', '${JSON.stringify(cards)}', '')`
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err.message);
        res.send({ registered: false })
      } else {
        res.send({ registered: true })
      }
    })
  })()
})

app.delete('/', async (req, result) => {
  console.log(req.body);
  const { phone, password } = req.body
  connection.query(`SELECT * FROM USERS WHERE phone = '${phone}' AND password = '${password}'`, (err, res) => {
   console.log('1', res);
    if (res.length) {
      connection.query(`DELETE FROM USERS WHERE phone = '${phone}' AND password = '${password}'`, (err, res) => {
        console.log('2', res);
      })
      result.send({result: true})
    } else {
      result.send({result: false})
    }
    
    connection.query('SELECT * FROM USERS', (err, res) => {
      console.log(res);
    })
  })
})

connection.query('SELECT * FROM USERS', (err, res) => {
  console.log(res);
})
// connection.query('DROP TABLE USERS', (err, res) => {
//   console.log(res);
// })
// connection.query('CREATE TABLE USERS(id int AUTO_INCREMENT PRIMARY KEY, fullName text, password text, email text, phone text, cards JSON)', (err, res) => {
//   console.log(res);
// })









