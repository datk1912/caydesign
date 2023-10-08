import fs from 'fs-extra';
import formidable from 'formidable';

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

    app.get('/product/:product_folder',(req,res) => {
        
        const folderName = req.params.product_folder;
        const folderPath = `./public/image/product/${folderName}`; 

        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Lỗi khi đọc thư mục:', err);
                // thêm code 404 page tại đây 

                return;
            }

            const data = {
                title: files,
                folder: folderName
            };
            
            console.log(files, data.folder);
            res.render('product-detail', data); 
        });
    })

    app.get('/contact', (req, res) => {
        res.render('contact');
    });

    app.get('/admin', (req, res) => {
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
            res.render('admin', data);

        });
    });

    app.post('/admin', (req,res) => {

        const form = formidable({ multiples: true }); 

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            // Đường dẫn tới thư mục để lưu trữ tệp
            const uploadDir = './public/image/product/' + fields.folderName;

            // Nếu chưa tồn tại, tạo thư mục mới
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Đổi tên file và lưu vào folder Product
            const uploadedFile = files.avatarimg;
            const newFileName = uploadDir + '.png';
            fs.rename(uploadedFile.filepath, newFileName, (renameErr) => {
                if (renameErr) {
                    console.error(renameErr);
                    return;
                } 
            });

            // Thêm các ảnh khác vào sản phẩm
            files.gallery.forEach((file) => {
                const newFilepath = `${uploadDir}/${file.originalFilename}`;
                fs.rename(file.filepath, newFilepath, err => err);
              });

        })
    })

    app.delete('/admin', (req,res) => {
        const folderName = req.query.folderName;
        console.log(folderName);
        fs.remove(`./public/image/product/${folderName}`);
        fs.remove(`./public/image/product/${folderName}.png`);

    })
}

export { route };