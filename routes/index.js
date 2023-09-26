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
            if (err) {
                console.error('Lỗi khi đọc thư mục:', err);
                return;
            }
            
            files = files.filter(file => {
                return !file.includes('.'); // lọc các tên không bao gồm dấu .
            })

            const data={
                title: files
            }
            res.render('product', data);

        });
    });

    let product_folder;
    app.post('/product', (req,res) => {
        console.log(req.body);
        product_folder = req.body.data;
    }) 


    app.get('/product/:product_folder',(req,res) => {
        const folderName = req.params.product_folder;
        const folderPath = `./public/image/product/${folderName}`; // Tạo đường dẫn đúng cho thư mục

        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Lỗi khi đọc thư mục:', err);
                return;
            }

            const data = {
                title: files,
                folder: product_folder
            };
            
            console.log(files, data.folder);
            res.render('product-detail', data); 
        });
    })



    app.get('/contact', (req, res) => {
        res.render('contact');
    });


}

export { route };