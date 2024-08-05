const express = require("express");
const Contact = require("../models/contact.model.js");
const router = express.Router();
const { getContacts, getContact, createContact, updateContact, deleteContact } = require("../Controllers/contact.controller.js");

router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router