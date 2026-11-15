const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const Product = require("./model/product");
const User = require("./model/user");
const Order = require("./model/order");

const products = [
    {
        name: "Nike Air Shoes",
        discription: "Comfortable sports shoes for daily use.",
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Shoes",
        stock: 20,
        rating: 4.5,
        numReviews: 25
    },
    {
        name: "Cotton T-Shirt",
        discription: "Soft cotton t-shirt for everyday wear.",
        price: 799,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        category: "Clothing",
        stock: 30,
        rating: 4,
        numReviews: 18
    },
    {
        name: "Wireless Headphones",
        discription: "Wireless headphones with powerful sound.",
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "Electronics",
        stock: 15,
        rating: 4.5,
        numReviews: 30
    },
    {
        name: "Smart Watch",
        discription: "Smart watch with fitness tracking.",
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        category: "Electronics",
        stock: 12,
        rating: 4,
        numReviews: 12
    },
    {
        name: "Laptop Backpack",
        discription: "Water resistant laptop backpack.",
        price: 1299,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        category: "Bags",
        stock: 25,
        rating: 4.5,
        numReviews: 20
    },
    {
        name: "Sunglasses",
        discription: "Stylish sunglasses for everyday use.",
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        category: "Accessories",
        stock: 40,
        rating: 4,
        numReviews: 15
    },
    {
        name: "Office Chair",
        discription: "Comfortable chair for office and study.",
        price: 5499,
        imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
        category: "Furniture",
        stock: 10,
        rating: 4.5,
        numReviews: 22
    },
    {
        name: "Table Lamp",
        discription: "Modern LED lamp for study and office.",
        price: 699,
        imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        category: "Home",
        stock: 30,
        rating: 4,
        numReviews: 10
    }
];


const seedData = async () => {
    try {

        // MongoDB connect
        await mongoose.connect(process.env.mongoose_URI);

        console.log("MongoDB connected");


        // Old data delete
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();


        // Products create
        const createdProducts = await Product.insertMany(products);

        console.log("Products created");


        // Password hash
        const password = await bcrypt.hash("123456", 10);


        // Users create
        const createdUsers = await User.create([
            {
                name: "Demo User",
                email: "user@gmail.com",
                password: password,
                role: "user",
                verified: true
            },
            {
                name: "Demo Admin",
                email: "admin@gmail.com",
                password: password,
                role: "admin",
                verified: true
            }
        ]);

        console.log("Users created");


        const user = createdUsers[0];


        // Dummy Orders
        const orders = [];


        for (let i = 0; i < 10; i++) {

            const product1 = createdProducts[i % createdProducts.length];

            const product2 = createdProducts[(i + 1) % createdProducts.length];

            const quantity1 = Math.floor(Math.random() * 3) + 1;
            const quantity2 = Math.floor(Math.random() * 2) + 1;


            const totalPrice =
                (product1.price * quantity1) +
                (product2.price * quantity2);


            const statuses = [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered"
            ];

            const status = statuses[i % statuses.length];


            orders.push({
                user: user._id,

                orderItems: [
                    {
                        name: product1.name,
                        quantity: quantity1,
                        image: product1.imageUrl,
                        price: product1.price,
                        product: product1._id
                    },
                    {
                        name: product2.name,
                        quantity: quantity2,
                        image: product2.imageUrl,
                        price: product2.price,
                        product: product2._id
                    }
                ],

                shippingAddress: {
                    address: "123 Main Street",
                    city: "Mohali",
                    postalCode: "160055",
                    country: "India"
                },

                paymentMethod: "Razorpay",

                paymentResult:
                    status === "Pending"
                        ? {}
                        : {
                            id: "pay_demo_" + (i + 1),
                            status: "Paid"
                        },

                totalPrice: totalPrice,

                isPaid: status !== "Pending",

                paidAt:
                    status !== "Pending"
                        ? new Date()
                        : undefined,

                isDelivered: status === "Delivered",

                deliveredAt:
                    status === "Delivered"
                        ? new Date()
                        : undefined,

                status: status
            });
        }


        await Order.insertMany(orders);

        console.log("10 Dummy orders created");

        console.log("Seed data inserted successfully");


console.log("Users created");

console.log("\nLogin Credentials:");
console.log("Admin: admin@gmail.com / 123456");
console.log("User: user@gmail.com / 123456");

        process.exit(0);

    } catch (error) {

        console.log("Error:", error.message);

        process.exit(1);
    }
};


seedData();