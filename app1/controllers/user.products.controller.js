const User = require('../models/user.model');  

exports.findAll = async (req, res) => {
    console.log("Find all user's products");

    try {
        const result = await User.find({}, {_id:0, username:1,products:1});  
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.findOne = async(req,res) => {
    
    const username = req.params.username;
    console.log("Find products for user: ", username);

    try {
        const result = await User.findOne({username:username}, {_id:0,username:1,products:1})
        res.status(200).json({data:result})
        console.log("Succes in finding products ", username);
    } catch(err) {
        res.status(400).json({data:err})
        console.log("Problem in finding products")
    }
}

exports.create = async(req,res) => {
    const username = req.body.username;
    const products = req.body.products
    console.log("Inserting products for user" , username)

    try {
        const result = await User.updateOne(
            {username:username},
            {
                $push:{
                    products:products
                }
            }
        )
        res.status(200).json({data:result});
        console.log("Success insert")
    } catch (err) {
        res.status(400).json({data:err})
        console.log("Failled insert")
    }
}
 
exports.update = async (req, res) => {
    const username = req.params.username;
    const _id = req.body.product._id;
    const quantity = req.body.product.quantity;  // Fixed to access quantity in product object

    console.log("Update product for username", username);

    try {
        const result = await User.updateOne(
            { username: username, "products._id": _id },
            {
                $set: { "products.$.quantity": quantity }
            }
        );
        res.status(200).json({ data: result });
        console.log("Success in updating product");
    } catch (err) {
        res.status(400).json({ data: err });
        console.log("Failed to update product");
    }
};



exports.delete = async (req, res) => {
    const username = req.params.username; // Get username from the route parameter
    const _id = req.params.id; // Get the product ID from the route parameter

    console.log("Delete Product for user:", username, "Product ID:", _id); // Debugging output

    try {
        const result = await User.updateOne(
            { username: username }, // Match user by username
            { $pull: { products: { _id: _id } } } // Remove the product with the specified ID
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not found or already deleted." });
        }

        res.status(200).json({ message: "Product deleted successfully", data: result });
        console.log("Success in deleting product");
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log("Failed to delete product:", err);
        console.log("Request Params:", req.params);

    }
};
