"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userArray = exports.usersRouter = void 0;
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const users_1 = require("../models/users");
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
let userArray = [];
exports.userArray = userArray;
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlencodedParser = body_parser_1.urlencoded({ extended: false });
//GET Request received on /Users
usersRouter.get('/', (req, res, next) => {
    //display users without passwords
    let userInfo = [];
    for (let i = 0; i < userArray.length; i++) {
        userInfo[i] = userArray[i].displayAsString();
    }
    res.send(userInfo);
    res.status(200);
});
//POST Request received on /Users
usersRouter.post('/', jsonParser, (req, res, next) => {
    //check previous users
    for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].userId === req.body.userId) {
            res.send({ message: 'UserId already exists' });
            return res.status(404);
        }
    }
    //add new user
    let newUser = new users_1.User(req.body.userId, req.body.firstName, req.body.lastName, req.body.emailAddress, req.body.password);
    userArray.push(newUser);
    res.status(201).json(newUser);
});
usersRouter.get('/:userId', (req, res, next) => {
    for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].userId === req.params.userId) {
            res.send(userArray[i]);
            //res.send(userArray[i].displayAsString());
            return;
        }
    }
    res.send({ message: 'User not found' });
    res.status(404);
});
usersRouter.patch('/:userId', (req, res, next) => {
    //let userId = req.params.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailAddress = req.body.emailAddress;
    let foundUser = null;
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].userId === req.params.userId) {
            foundUser = userArray[i];
            foundUser.firstName = firstName;
            foundUser.lastName = lastName;
            foundUser.emailAddress = emailAddress;
            break;
        }
    }
    if (foundUser === null) {
        res.status(404).send({ message: ` ${firstName} was not found` });
    }
    else {
        res.status(200).send(foundUser);
    }
});
usersRouter.delete('/:userId', (req, res, next) => {
    for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].userId === req.params.userId) {
            userArray.splice(i, 1);
            return res.status(200).send({ message: 'User deleted' });
        }
    }
    res.status(404).send({ message: 'User not found' });
});
//# sourceMappingURL=userRoute.js.map