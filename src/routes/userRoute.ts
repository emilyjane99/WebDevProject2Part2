import { urlencoded } from 'body-parser';
import express from 'express';
import { User } from '../models/users';

const usersRouter = express.Router();

let userArray:User[]=[];
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlencodedParser = urlencoded({extended: false});

//GET Request received on /Users
usersRouter.get('/', (req,res,next)=>{
    //display users without passwords
    let userInfo:Object[] = [];

    for(let i = 0; i < userArray.length; i++)
    {
        userInfo[i] = userArray[i].displayAsString();
    }
    res.send(userInfo);
    res.status(200);
});

//POST Request received on /Users
usersRouter.post('/', jsonParser, (req, res,next)=>{
    //check previous users
    for(var i=0; i<userArray.length; i++)
    {
        if(userArray[i].userId === req.body.userId)
        {
            res.send({message: 'UserId already exists'});
            return res.status(404);
        }
    }
    //add new user
    let newUser = new User(req.body.userId, req.body.firstName, req.body.lastName, req.body.emailAddress, req.body.password);
    userArray.push(newUser);
    res.status(201).json(newUser);
});

usersRouter.get('/:userId', (req,res,next)=>{

    for(var i=0; i<userArray.length; i++)
    {
        if(userArray[i].userId === req.params.userId)
        {
            res.send(userArray[i]);
            //res.send(userArray[i].displayAsString());
            return;
        }
    }
    res.send({message: 'User not found'});
    res.status(404);
});

usersRouter.patch('/:userId', (req, res, next) => {
    //let userId = req.params.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailAddress = req.body.emailAddress;
    let foundUser:User|null = null;

    for(let i = 0; i < userArray.length; i++){
        if(userArray[i].userId === req.params.userId){
            foundUser = userArray[i];
            foundUser.firstName = firstName;
            foundUser.lastName = lastName;
            foundUser.emailAddress = emailAddress;
            break;
        }
    }

    if(foundUser === null)
    {
        res.status(404).send({message:` ${firstName} was not found`});
    }
    else
    {
        res.status(200).send(foundUser);
    }
});

usersRouter.delete('/:userId', (req,res,next)=>{
    for(var i=0; i<userArray.length; i++)
    {
        if(userArray[i].userId === req.params.userId)
        {
            userArray.splice(i,1);
            return res.status(200).send({message: 'User deleted'});
        }
    }

    res.status(404).send({message: 'User not found'});
});

export {usersRouter}
export {userArray}