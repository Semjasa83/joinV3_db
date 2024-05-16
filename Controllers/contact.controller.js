const Contact = require("../models/contact.model");

//get all Contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({contacts});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get a specific Contact
const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json({ contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//add a new Contact
const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(200).json({ contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update a Contact
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body);
        if (!contact) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updatedContact = await Contact.findById(id);
        res.status(200).json({ updatedContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete a Contact
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};