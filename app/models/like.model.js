// like.model.js
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the User model (assuming you have a User model)
        required: true,
    },
    likedProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
    }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
