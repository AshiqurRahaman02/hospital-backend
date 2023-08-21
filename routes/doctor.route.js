const express = require("express");
const { DoctorModel } = require("../models/doctor.model");

const doctorRouter = express.Router();

doctorRouter.post("/appointments", async (req, res) => {
    const {name, imageUrl, specialization, experience, location, slots, fee}= req.body;

    try {
        const newDoctor = new DoctorModel({name, imageUrl, specialization, experience, location, slots, fee});
        await newDoctor.save();
        res.status(201).json({
            isError: false,
            message: "Appointments posted successfully",
        });
    } catch (error) {
        res.status(404).json({ isError: true, message: error.message });
    }
})

doctorRouter.get("/appointments", async (req, res) => {
    try {
        const appointments = await DoctorModel.find();
        res.status(200).json({ isError: false, appointments });
    } catch (error) {
        res.status(404).json({ isError: true, message: error.message });
    }
})

doctorRouter.get("/filter", async (req, res) => {
	try {
		const { specialization } = req.query;
		const appointments = await DoctorModel.find({ specialization });
		res.status(200).json({ isError: false, appointments });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

doctorRouter.get("/search", async (req, res) => {
	try {
		const { name } = req.query;
		const appointments = await DoctorModel.find({ name });
		res.status(200).json({ isError: false, appointments });
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
});

module.exports = {
	doctorRouter,
};
