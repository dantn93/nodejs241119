const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
    _id : String,
    name : String,
    image : String,
    thumbnail : String,
    shortDescription : String,
    categoryId : String,
    salePrice : Number,
    originalPrice : Number,
    images : [String],
    thumbnails : [String]
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
