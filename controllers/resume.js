const Joi = require("joi");
const ResumeService = require("../services/resume");
const resumeRouter = require('express').Router();
const ResumeModel = require('../models/resume')
const multer = require("multer");
const {uploadFile} = require("../helpers/avatar");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const ResumeRequest = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    location: Joi.string().required(),
    technology: Joi.string().required(),
    experience: Joi.string().required(),
    current_sal: Joi.string().required(),
    expected_sal: Joi.string().required(),
    availability: Joi.string().required(),
    contact: Joi.string().required(),
    email: Joi.string().email().required(),
});

resumeRouter.post("/resume", upload.single("resume-file"), (async (req, res) => {
    try {
        const resume_file = await uploadFile(req?.file?.buffer);

        const reqBody = await ResumeRequest.validateAsync(req.body);
        const resumeServ = new ResumeService(reqBody, res, req.user);
        const data = await resumeServ.resumeForm(resume_file);

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

resumeRouter.get("/resume",(async (req, res) => {
    try {
        const resumes = await ResumeModel.find();
        res.json({ message: "Resumes retrieved successfully.", resumes });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));

module.exports = resumeRouter;