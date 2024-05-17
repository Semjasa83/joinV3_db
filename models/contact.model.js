const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
    {
        firstname: {
        type: String,
        required: true,
        },

        lastname: {
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

        mobile: {
        type: Number,
        required: false,
        },

        address: {
            street: {
                type: String,
                required: false,
            },
            streetnumber: { 
                type: Number,
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
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;