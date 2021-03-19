"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = require("./routes/userRoute");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
let app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/Users', userRoute_1.usersRouter);
app.use('/', (req, res, next) => {
    //app.use(express.static('public/html'));
    res.sendFile(path_1.default.join(process.cwd(), '../public/html/help.html'));
    // res.sendFile(path.join(process.cwd(), 'public/html/help.css'));
    //res.status(404).send('Sorry, page not found');
});
app.listen(3000);
//# sourceMappingURL=app.js.map