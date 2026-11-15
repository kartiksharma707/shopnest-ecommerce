const Product = require("../model/product");
const cloudinary = require("../config/cloudinary");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createProduct = async (req, res) => {

    const { name, discription, price, category, stock } = req.body;

    try {

        let img_url = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            img_url = result.secure_url;
        }

        const product = new Product({
            name,
            discription,
            price,
            category,
            stock,
            imageUrl: img_url
        });

        await product.save();

        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("Params:", req.params);
        console.log("ID:", id);

        const { name, discription, price, category, stock } = req.body;

        let img_url = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            img_url = result.secure_url;
        }

        const updatedproduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                discription,
                price,
                category,
                stock,
                ...(img_url && { imageUrl: img_url })
            },
            { new: true }
        );

        if (!updatedproduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(updatedproduct);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.verified = true;

        await user.save();

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    verifyEmail
};