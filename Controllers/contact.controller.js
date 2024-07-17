const Contact = require("../models/contact.model");
const { io } = require('../socket');


const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        io.emit("contactsFetched", {contacts}); // Ereignisname: contactsFetched
        res.json(contacts); // HTTP-Antwort senden
    } catch (error) {
        io.emit("error", {message: error.message}); // Fehlerereignis
        res.status(500).send(error.message); // HTTP-Fehlerantwort
    }
}

const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            res.status(404).send("Contact not found");
            return;
        }
        io.emit("contactFetched", {contact}); // Ereignisname: contactFetched
        res.json(contact); // HTTP-Antwort senden
    } catch (error) {
        io.emit("error", {message: error.message}); // Fehlerereignis
        res.status(500).send(error.message); // HTTP-Fehlerantwort
    }
}

const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        io.emit("contactCreated", {contact}); // Ereignisname: contactCreated
        res.status(201).json(contact); // HTTP-Antwort senden
    } catch (error) {
        io.emit("error", {message: error.message}); // Fehlerereignis
        res.status(500).send(error.message); // HTTP-Fehlerantwort
    }
}

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
        if (!contact) {
            io.emit("error", {message: "Contact not found"});
            res.status(404).send("Contact not found");
            return;
        }
        io.emit("contactUpdated", {contact}); // Ereignisname: contactUpdated
        res.json(contact); // HTTP-Antwort senden
    } catch (error) {
        io.emit("error", {message: error.message}); // Fehlerereignis
        res.status(500).send(error.message); // HTTP-Fehlerantwort
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            io.emit("error", {message: "Contact not found"});
            res.status(404).send("Contact not found");
            return;
        }
        io.emit("contactDeleted", {contact}); // Ereignisname: contactDeleted
        res.status(200).send("Contact deleted");
    } catch (error) {
        io.emit("error", {message: error.message}); // Fehlerereignis
        res.status(500).send(error.message); // HTTP-Fehlerantwort
    }
};

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};