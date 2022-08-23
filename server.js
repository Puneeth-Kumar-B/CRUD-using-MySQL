const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser');
const app = express()

app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$lh50155015',
    database: 'nodemysql',
    port: 3306,
    insecureAuth: false,
    multipleStatements: true
})

db.connect((error) => {
    if (error) { throw error.message }
    console.log('MySQL connected successfully')
})

app.get('/userdata', (req, res) => {
    db.query('SELECT * FROM nodemysql.user', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log(rows);
        } else
            console.log(err);
    })
})

app.get('/userdata/:id', (req, res) => {
    db.query('SELECT * FROM nodemysql.user WHERE userId = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log(rows);
        } else
            console.log(err);
    })
});

app.delete('/userdata/:id', (req, res) => {
    db.query('DELETE FROM nodemysql.user WHERE userId = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send({ message: 'Deleted successfully', rows });
            console.log(rows);
        } else
            console.log(err);
    })
});

app.post('/createUser', (req, res) => {
    var sql = "LOCK TABLES `user` WRITE;\
    INSERT INTO `user` VALUES (2, 'Nikhil', 'nick123@gmail.com', '8654722197');\
    UNLOCK TABLES;"
    db.query(sql, (err, rows, fields) => {
        if (!err) {
            res.send({ message: 'Created successfully', rows });
            console.log(rows);
        } else
            console.log(err);
    })
});

app.post('/student', (req, res) => {
    let userId = req.body.userId;
    let userName = req.body.userName;
    let emailId = req.body.emailId;
    let phoneNo = req.body.phoneNo;

    let gr = `INSERT INTO user(userId,userName,emailId,phoneNo)
    VALUES ('${userId}','${userName}','${emailId}','${phoneNo}')`;

    db.query(gr, (err, results) => {
        if (err) { console.log(err); }
        console.log(results, "results")
        res.send({ message: 'data inserted successfully' })
    });
})

app.put('/user/:id', (req, res) => {
    console.log(req.body, 'updatedata');
    let gID = req.params.id;
    let userId = req.body.userId;
    let userName = req.body.userName;
    let emailId = req.body.emailId;
    let phoneNo = req.body.phoneNo;
    let gr = `UPDATE user SET userId = '${userId}', userName='${userName}',emailId='${emailId}',phoneNo='${phoneNo}' WHERE userId = '${gID}'`;

    db.query(gr, (err, results) => {
        if (err) { console.log(err) }
        res.send({ message: 'data updated' });
    });
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Connection at ${port}`);
});