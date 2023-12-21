const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: 'images/',
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/products",upload.single('image'), controller.saveProduct
    );

    app.post(
        "/api/products/likes", controller.like
    );

    app.get(
        "/api/products/user/:userId",
        controller.getUserProducts
    );

    app.get(
        "/api/products/all",
        controller.getAllProducts
    );

    app.get(
        "/api/products/not-related/:userId",
        controller.getNotRelatedProducts
    );

    app.get(
        "/api/products",
        controller.findByTitle
    );

    app.delete(
        "/api/products/:productId",
        controller.deleteProduct
    );
};
