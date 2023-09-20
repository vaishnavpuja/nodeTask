const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

let ptoductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['electronics', 'clothing'],
        default: 'electronics'
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: ['inStock', 'outOfStock'],
        default: 'inStock'
    },
    size: {
        type: String,
        required: true
    }
})
ptoductSchema.plugin(mongoosePaginate);

Product = mongoose.model('Product', ptoductSchema);

module.exports = Product;