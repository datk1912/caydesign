function route(app){

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
}

export { route };