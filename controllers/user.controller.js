const User = require('../models/user.model');



exports.findAll = async(req, res) => {
    console.log("Finde All Users");

    try{
        const result = await User.find();
        res.status(200).json({data: result});
    } catch (err) {
        console.log(`Problem in reading users, ${err}`)
    }
}

exports.findOne = async(req, res) => {
    console.log("Find a User");

    const username = req.params.username;
    try {
        const result = await User.findOne({ username: username})
        res.status(200).json({data: result});
    } catch (err) {
        console.log(`Problem in reading user, ${err}`)
    }
}

exports.create = async(req,res) => {
    console.log("Insert user")
    console.log(req.body);

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })

    try {
        const result = await newUser.save();
        res.status(200).json({data: result});
        console.log("User saved saccefully");
    } catch (err) {
        res.status(400).json({data: err});
        console.log("Problem in saving user");
    }
}

exports.update = async(req,res) => {
    const username = req.params.username;
    console.log("Update user with username: ", username);

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address:req.body.address,
        phone: req.body.phone

    }
    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser,
            {new: true}
        )
        res.status(200).json({data: result});
        console.log("Succesing in updating user", username)
    } catch(err) {
        res.status(400).json({data:err})
        console.log("Problem in updating user", username);
    }
}

exports.delete = async (req, res) => {
    const username = req.params.username;
    console.log("Delete User: ", username);

    try {
        const result = await User.findOneAndDelete({ username: username });
        
        if (!result) {
            res.status(404).json({ message: "User not found" });
            console.log("User not found");
            return; // Exit the function after sending the response
        }

        res.status(200).json({ data: result });
        console.log("Successfully deleted User", username);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the user", error: err });
        console.log("Problem in deleting user: ", username, err);
    }
};
