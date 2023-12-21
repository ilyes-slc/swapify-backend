const Product = require("../models/product.model");
const User = require("../models/user.model");
const Like = require("../models/like.model");

exports.saveProduct = async (req, res) => {
    try {
        const { name, description, price, userId } = req.body;
        const imageName = req.file.filename
        //const userId = req.userId;

        const product = new Product({
            name,
            description,
            price,
            imageName
        });

        await product.save();

        // Associate the product with the user
        const user = await User.findById(userId);
        user.products.push(product._id);
        await user.save();

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate("products");

        res.json(user.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.findByTitle = async (req, res) => {
    const title = req.query.title;

    try {
        const products = await Product.find({ title: { $regex: new RegExp(title), $options: "i" } });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getNotRelatedProducts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate("products");

        const allProducts = await Product.find();
        const userProductIds = user.products.map(product => product._id);

        const notRelatedProducts = allProducts.filter(product =>
            !userProductIds.includes(product._id.toString())
        );

        res.json(notRelatedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Remove the product from the User's products array
        await User.updateOne(
            { products: productId },
            { $pull: { products: productId } }
        );

        // Delete the product itself
        await Product.findByIdAndRemove(productId);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.like = async (req, res) => {
    try {
        const { productId, likedProductId } = req.body;

        // Check if a like with inversed values already exists
        const existingInversedLike = await Like.findOne({
            productId: likedProductId,
            likedProductId: productId
        });

        if (existingInversedLike) {
            // If a match is found, send a success alert
            res.status(200).json({ message: "Match found." });
        } else {
            // If no match is found, save the normal like
            const like = new Like({
                productId,
                likedProductId
            });

            await like.save();

            // Send a success response with the saved like
            res.status(201).json(like);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
