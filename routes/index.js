import fs from 'fs';

function route(app){

    app.get('/', (req, res) => {
        res.render('home');
    });
    
    app.get('/about-us', (req, res) => {
        res.render('about-us');
    });

    app.get('/product', (req, res) => {
        fs.readdir('./public/image/product', (err, files) => {    
            files = files.filter(file => {
                return !file.includes('.'); // lọc các tên không bao gồm dấu .
            })

            const data={
                title: files
            }
            res.render('product', data);

        });
    });
    
    app.post('/product', (req,res) => {
        console.log(req.body);
    }) 

    app.get('/contact', (req, res) => {
        res.render('contact');
    });


}

export { route };