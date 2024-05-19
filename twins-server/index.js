const mysql = require('mysql2');
const http = require('http');
const express = require('express');
const cors = require("cors");
const { error } = require('console');

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
    const query = `INSERT INTO USERS (fullName, phone, password, email) VALUES (?, ?, ?, ?)`
    connection.query(query, [fullName, phone, password, ''], (err, result) => {
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
      result.send({ result: true })
    } else {
      result.send({ result: false })
    }

    connection.query('SELECT * FROM USERS', (err, res) => {
      console.log(res);
    })
  })
})

app.post('/edit', (req, res) => {
  const { fullName, phone, email, oldPhone } = req.body
  console.log(fullName, phone, email, oldPhone);
  connection.query('UPDATE USERS set fullName = ?, phone = ?, email = ? WHERE phone = ?', [fullName, phone, email, oldPhone], (err, r) => {
    if (err) {
      res.status(500).send({ error: err.message })
    }
  })
  connection.query('SELECT * FROM USERS WHERE phone = ?', [phone], (err, user) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      console.log(user);
      res.status(200).send({ user: user[0] })
    }
  })
})

app.post('/card', (req, res) => {
  const { card, expiration, code, owner, userId } = req.body
  connection.query('INSERT INTO Cards (card, expiration, code, owner, userId) VALUES (?, ?, ?, ?, ?)', [card, expiration, code, owner, userId], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.delete('/card', (req, res) => {
  const { userId, card } = req.body
  connection.query('DELETE FROM Cards Where userId = ? and card = ?', [userId, card], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.post('/cards', (req, res) => {
  const { userId } = req.body
  connection.query('SELECT * FROM Cards WHERE userId = ?', [userId], (err, cards) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ cards: cards })
    }
  })
})

connection.query('SELECT * FROM USERS', (err, res) => {
  console.log(res);
})
// connection.query('DROP TABLE USERS', (err, res) => {
//   console.log(res);
// })
// connection.query('CREATE TABLE USERS(id int AUTO_INCREMENT PRIMARY KEY, fullName text, password text, email text, phone text)', (err, res) => {
//   console.log(res);
// })

// connection.query('Drop table Cards')

// connection.query('CREATE TABLE Cards(id int AUTO_INCREMENT PRIMARY KEY, card text, expiration text, code text, owner text, userId int)')









