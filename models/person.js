const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ["Developer", "Designer", "Manager"],
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

personSchema.pre("save", async function (next) {
    const person = this;
    if (!person.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);
        person.password = hashPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
    const person = this;
    try {
        const isMatch = await bcrypt.compare(
            candidatePassword,
            person.password
        );
        return isMatch;
    } catch (err) {
        return false;
    }
};

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
