var express = require('express');
var router = express.Router();
import fs from 'fs';
import gallerySchema from '../models/gallerySchema';
// import Gallery from '../models/gallerySchema';
const multer = require('multer');
const admin = require("../db/database");



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
    if (req.file) {
        // let new_img = new Gallery({
        //     img: {
        //         data: fs.readFileSync(req.file?.path),
        //         contentType: 'image/jpeg',
        //     },
        // });
        // new_img.save().then((data) => {
        //     res.json({ imageId: data._id });
        //     //res.status(200).send('Image uploaded and saved successfully');
        // });
    }
});

router.get('/:imageId', (req: any, res: any) => {
    gallerySchema.findById(req.params.imageId).then((result) => {
        res.status(200).send(result);
    });
});
export default router;
