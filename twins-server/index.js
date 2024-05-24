const mysql = require('mysql2');
const http = require('http');
const express = require('express');
const cors = require("cors");
const { error, log } = require('console');
const { register } = require('module');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: '5000mb' }))


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
app.put('/', async (req, res) => {
  const { fullName, phone, password } = req.body;

  try {
    // First check if the phone number already exists
    const [data] = await connection.promise().query('SELECT * FROM USERS WHERE phone = ?', [phone]);
    if (data.length > 0) {
      return res.status(500).send({ error: 'Phone already exists' });
    }

    // Insert new user
    const query = 'INSERT INTO USERS (fullName, phone, password, email) VALUES (?, ?, ?, ?)';
    await connection.promise().query(query, [fullName, phone, password, '']);

    // Retrieve and send the last inserted user
    const [users] = await connection.promise().query('SELECT * FROM USERS ORDER BY id DESC LIMIT 1');
    res.status(200).send({ user: users[0] });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

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

app.put('/ingredient', (req, res) => {
  const { name, photo } = req.body
  connection.query('INSERT INTO Ingredients(name, src) VALUES (?, ?)', [name, photo], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.delete('/ingredient', (req, res) => {
  const { id } = req.body
  connection.query('DELETE FROM Ingredients WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.get('/ingredients', (req, res) => {
  connection.query('SELECT * FROM Ingredients', (err, data) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ ingredients: data })
    }
  })
})

app.post('/ingredient', (req, res) => {
  const { id } = req.body
  connection.query('SELECT * FROM Ingredients WHERE id = ?', [id], (err, data) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      console.log(data);
      res.status(200).send({ data: data[0] })
    }
  })
})

app.post('/menu', (req, res) => {
  const { type } = req.body
  connection.query('SELECT * FROM Products WHERE type = ?', [type], (err, menu) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ menu })
    }
  })
})

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM USERS', (err, users) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ users })
    }
  })
})

app.post('/product/edit', (req, res) => {
  const { name, price, id, photo } = req.body
  connection.query('UPDATE Products SET name = ?, price = ?, src = ? WHERE id = ?', [name, price, photo, id], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.delete('/users', (req, res) => {
  const { id } = req.body
  connection.query('DELETE FROM USERS WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.put('/product', (req, res) => {
  const { photo, name, price, ingredients, type } = req.body
  const ingredientJSON = JSON.stringify(ingredients)
  connection.query('INSERT INTO Products (name, price, src, ingredients, type) VALUES(? ,? ,? ,?, ?)', [name, price, photo, ingredientJSON, type], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.put('/busket', (req, res) => {
  const { userId, productId, count } = req.body

  connection.query('INSERT INTO Busket(userId, productId, count) VALUES(?,?,?)', [userId, productId, count], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })

})

app.post('/busket/edit', (req, res) => {
  const { userId, productId, count } = req.body
  connection.query('UPDATE Busket SET count = ? WHERE userId = ? and productId = ?', [count, userId, productId], (err) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      res.status(200).send({ success: true })
    }
  })
})

app.post('/busket', (req, res) => {
  const { userId } = req.body
  connection.query('SELECT * FROM Busket WHERE userId = ?', [userId], (err, busket) => {
    if (err) {
      res.status(500).send({ error: err.message })
    } else {
      const result = []
      for (let i = 0; i < busket.length; i++) {
        connection.query('SELECT * FROM Products Where id = ?', [busket[i].productId], (err, product) => {
          if (err) {
            res.status(500).send({ error: err.message })
          }
          result.push({
            id: product[0].id,
            name: product[0].name,
            price: product[0].price,
            src: product[0].src,
            count: busket[i].count
          })
          if (i === busket.length - 1) {
            res.status(200).send({ busket: result })
          }
        })
      }
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

// connection.query('CREATE TABLE Burgers(id int AUTO_INCREMENT PRIMARY KEY, name text, price text, src LONGTEXT, type text)')

// connection.query('CREATE TABLE Cards(id int AUTO_INCREMENT PRIMARY KEY, card text, expiration text, code text, owner text, userId int)')
// connection.query('CREATE TABLE Ingredients (id int AUTO_INCREMENT PRIMARY KEY, name text, src LONGTEXT)')



// connection.query('CREATE TABLE Busket (id int AUTO_INCREMENT PRIMARY KEY, userId int, productId int, count int)')



