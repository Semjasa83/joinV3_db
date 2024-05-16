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
        required: true,
        },

        address: {
            street: {
                type: String,
                required: true,
            },
            streetnumber: { 
                type: Number,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            zip: {
                type: Number,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);