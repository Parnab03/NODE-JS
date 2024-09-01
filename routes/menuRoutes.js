const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu");

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log("Menu data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Menu data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:categoryType", async (req, res) => {
    try {
        const categoryType = req.params.categoryType;
        if (
            categoryType == "veg" ||
            categoryType == "non-veg" ||
            categoryType == "vegan"
        ) {
            const response = await MenuItem.find({ category: categoryType });
            console.log("Category Type Response fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json("Invalid category type");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(
            menuId,
            updatedMenuData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!response) {
            return res.status(404).json({ error: "Menu not found" });
        }

        console.log("Menu updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: "Menu not found" });
        }

        console.log("Menu deleted");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
