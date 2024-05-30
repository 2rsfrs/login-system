const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const {createUser, display, updateUser, deleteUser, login} = require('./crud');
const bcrypt = require('bcrypt');

const PORT = 3000;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200', credentials: true, methods: "PUT,POST,DELETE", "optionsSuccessStatus": 200
    }));

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password, (err) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).json(true);
    });
});

app.post('/signup', (req, res) => {
    const {email, password} = req.body;
    createUser(email, password, (err) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).json(true);
    });

});

app.get('/allinfo', (req, res) =>{
    display((err, rows) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).json(rows);
    });
});

app.put('/update', (req, res) => {
    const {email, password, new_password} = req.body;
    updateUser(email, password, new_password, (err) => {
        if (err) res.status(500).send(err.message);
        else res.status(200);
    });
});

app.delete('/delete', (req, res) => {
    const {email, password} = req.body;
    deleteUser(email, password, (err) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).json(true);
    });
});


app.listen(PORT, ()=>{
    console.log("server is running");
});