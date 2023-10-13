import express from 'express';
import { engine } from 'express-handlebars';
import { route } from './routes/index.js'
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();
global.pass = process.env.PASSWORD;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(
    session({
      secret: 'KhAvInHdAt*#',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000, // Thời gian sống của session trong mili giây (đây là 1 giờ)
      },
    })
  );

app.engine('.hbs', engine({extname: '.hbs'})); // cấu hình view engine
app.set('view engine', '.hbs');
app.set('views', './views');

// route

route(app);

// kết nối localhost:3000

app.listen((3000), function() {
    console.log("Sever listen to port 3000");
});