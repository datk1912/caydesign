import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.engine('.hbs', engine({extname: '.hbs'})); // cấu hình view engine
app.set('view engine', '.hbs');
app.set('views', './views');

// route

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about-us', (req, res) => {
    res.render('about-us');
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// kết nối localhost:3000

app.listen((3000), function() {
    console.log("Sever listen to port 3000");
});