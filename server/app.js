const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, 'upload_at_' + Date.now() + path.extname(file.originalname))
    }
  })
const upload = multer({ storage: storage });

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    console.log(file.filename);
    if(!file) return res.status(400).json({message: 'file not exist'});
    let imageURL;
    await cloudinary.uploader.upload(file.path, (err, result) => {
      if(err){
        console.log('file upload error', err);
      }
      imageURL = result.secure_url;
      const imagePath = file.path;
      fs.unlinkSync(imagePath);
    });
    res.json({data: req.body.name, url: imageURL});
});

app.listen(3000);