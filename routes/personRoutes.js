const express = require("express");
const router = express.Router();
const fs = require("fs");
const Person = require("../models/person");
const { error } = require("console");

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Person data saved");
        res.status(200).json(response);
        fs.writeFile("output.txt", `${JSON.stringify(data)}`, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File written successfully");
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Person data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (
            workType == "Developer" ||
            workType == "Designer" ||
            workType == "Manager"
        ) {
            const response = await Person.find({ work: workType });
            console.log("Work Type Response fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json("Invalid work type");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(
            personId,
            updatedPersonData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Person updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Person deleted");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
