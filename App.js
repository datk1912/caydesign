import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about_us', (req, res) => {
    res.render('about us');
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen((3000), function() {
    console.log("Sever listen to port 3000");
});