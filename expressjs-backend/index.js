//comment
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
        id : 'ppp221', 
        name: 'MacBACKEND',
        job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}
app.use(cors());
app.use(express.json());

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd['id'] = Date.now().toString();
    addUser(userToAdd);
    console.log("user added to backend : " + userToAdd);
    res.status(201).send({user : userToAdd});
});

function addUser(user){
    users['users_list'].push(user);
}

function deleteUserByID(id){
    users['users_list'].splice(users['users_list'].findIndex( (user) => user['id'] === id), 1); // or line below
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(204).send('Resource not found.');
    else {
        deleteUserByID(id);
        res.status(200).send('Resource deleted.');
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job  = req.query.job;
    if (name != undefined){
        if (job != undefined) {
            let result = findUserByNameAndJob(name, job);
            result = {users_list: result};    
            res.send(result);
        } else {
            let result = findUserByName(name);
            result = {users_list: result};    
            res.send(result);
        }        
    }
    else{
        res.send(users);
    }
});


const findUserByNameAndJob = (name, job) => { 
    return users['users_list'].filter( (user) => (user['name'] === name && user['job'] === job)); 
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});     