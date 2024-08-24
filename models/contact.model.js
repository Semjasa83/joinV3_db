const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        phone: {
            type: Number,
            required: false,
        },

        address: {
            street: {
                type: String,
                required: false,
            },
            streetNumber: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: false,
            },
            zip: {
                type: Number,
                required: false,
            },
            country: {
                type: String,
                required: false,
            },
        },
        color: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
