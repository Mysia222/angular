import mongoose from 'mongoose';
var GallerySchema = new mongoose.Schema(
    {
        img: { data: Buffer, contentType: String },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model('gallery', GallerySchema);
