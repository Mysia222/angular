var express = require('express');
var router = express.Router();
import fs from 'fs';
import Gallery from '../models/gallerySchema';
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, 'uploads/');
    },
    filename: (req: any, file: { originalname: string }, cb: (arg0: null, arg1: string) => void) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async function (req: any, res: any) {
    let new_img = new Gallery({
        img: {
            data: fs.readFileSync(req.file.path),
            contentType: 'image/jpeg',
        },
    });
    new_img.save().then(data => {
        console.log(data);
        res.json({ imageId: 'New image added to the db!' });
    });
    // if (!req.file) {
    //     return res.status(500).send({ message: 'Upload fail' });
    // } else {
    //     req.body.imageUrl = 'http://192.168.0.7:3000/images/' + req.file.filename;
    //     Gallery.create(req.body, function (err: any, gallery: any) {
    //         if (err) {
    //             console.log(err);
    //             return next(err);
    //         }
    //         res.json(gallery);
    //     });
    // }
});
export default router;
