import fs from 'fs-extra';
import formidable from 'formidable';
import nodemailer from 'nodemailer';


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

    app.post('/contact', (req, res) => {
        console.log(req.body);

        // thiết lập gmail để gửi
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'caydesignform@gmail.com',
              pass: 'uynp tsgt zkjy zfiv'
            }
          });

        // thiết lập thông tin mail
        var mailOptions = {
            from: 'caydesignweb@gmail.com',
            to: 'datk1912@gmail.com',
            subject: 'Người dùng liên hệ!',
            html: `<!DOCTYPE html><html><head><style>/* CSS cho email */body {font-family: Arial, sans-serif;background-color: #f4f4f4;padding: 20px;}.container {background-color: #fff;padding: 20px;border-radius: 5px;box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);}h1 {color: #333;}p {color: #777;}</style></head><body><div class="container"><h1>Thông tin liên hệ</h1><p>Xin chào Admin,</p><p>Dưới đây là thông tin liên hệ từ một khách hàng:</p><ul><li><strong>Tên:</strong> ${req.body.ten}</li><li><strong>Email:</strong> ${req.body.email}</li><li><strong>Số điện thoại:</strong> ${req.body.sdt}</li><li><strong>Nội dung:</strong> ${req.body.noidung}</li></ul><p>Cảm ơn bạn đã quan tâm đến thông tin liên hệ. Hãy xem xét phản hồi khách hàng khi cần.</p></div></body></html>`
        };

        // gửi mail
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.redirect('/contact');
    })

    

    app.get('/login', (req,res) => {
        if(req.session.isAuthenticated){
            res.redirect('/admin');
        }
        else{
        res.render('login');
        }
    })

    app.post('/login', (req,res) => {
        console.log(req.body);
        if (req.body.username == process.env.USER && req.body.password == process.env.PASSWORD){
            req.session.isAuthenticated = true;
            res.redirect('/admin');
        }
        else{
            res.redirect('/login');
        }
    })

    app.get('/admin', (req, res) => {
        if (!req.session.isAuthenticated) {
            res.redirect('/login');
            return;
        }

        fs.readdir('./public/image/product', (err, files) => {    
            if (err) {
                console.error('Lỗi khi đọc thư mục:', err);
                return;
            }
            
            files = files.filter(file => {
                return !file.includes('.'); // lọc các tên không bao gồm dấu .
            })

            const data={
                title: files,
                isLogin: true
            }
            res.render('admin', data);
        });
        
    });

    app.post('/admin', (req,res) => {

        if (!req.session.isAuthenticated) {
            res.redirect('/login');
            return;
        }

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

            res.redirect('./admin');
        })
    })

    app.delete('/admin', (req,res) => {
        if (!req.session.isAuthenticated) {
            res.redirect('/login');
        }

        const folderName = req.query.folderName;
        const folderPath = `./public/image/product/${folderName}`;

        if (fs.existsSync(folderPath)) {
            fs.remove(folderPath);
            // Xóa ảnh đại diện product
            fs.remove(`${folderPath}.png`);
        }
    })
}

export { route };