import express from 'express';
import { engine } from 'express-handlebars';
import { route } from './routes/index.js'
import fs from 'fs';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'})); // cấu hình view engine
app.set('view engine', '.hbs');
app.set('views', './views');

// route

route(app);




// kết nối localhost:3000

app.listen((3000), function() {
    console.log("Sever listen to port 3000");
});