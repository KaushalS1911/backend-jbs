const Joi = require("joi");
const InquiryService = require("../services/Inquiry");
const inquiryRouter = require('express').Router();

const InquiryRequest = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contact: Joi.string().required(),
    email: Joi.string().email().required(),
    courses: Joi.string().required(),
});

inquiryRouter.post("/inquiry-form",(async (req, res) => {
    try {

        const reqBody = await InquiryRequest.validateAsync(req.body);
        const inquiryServ = new InquiryService(reqBody, res, req.user);
        const data = await inquiryServ.inquiryForm();

        if (!res.headersSent) {
            res.json({ message: "Data add successfully.", data });
        }
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}));

inquiryRouter.get("/inquiry",(async (req, res) => {
    try {
        const inquiryServ = new InquiryService(req, res, req.query);
        const inquiry = await inquiryServ.getAllinquiry();
        res.json({ message: "Inquiry retrieved successfully.", inquiry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));

module.exports = inquiryRouter;