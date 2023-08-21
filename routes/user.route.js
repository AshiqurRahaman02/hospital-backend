const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
	try {
        console.log(password);
		bcrypt.hash(password, 2, async (err, hash) => {
			if (err) {
				res.status(404).json({ isError: true, message: err });
			}

			const newUser = new UserModel({ email, password: hash });
            console.log(newUser)
			await newUser.save();
			res.status(201).json({
				isError: false,
				message: "User registered successfully",
			});
		});
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

userRouter.post("/api/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		if (!user) {
			res.status(404).json({ isError: true, message: "User not found" });
		}

		bcrypt.compare(password, user.password, async function (err, result) {
			if (err) {
				res.status(501).json({ isError: true, message: err });
			}

			res.status(201).json({
				isError: false,
				message: "User login successful",
				token: jwt.sign({ userId: user._id }, process.env.jtwSecret),
			});
		});
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

module.exports = {
	userRouter,
};
