const Joi = require("joi");
const UserService = require("../services/auth");
const userRouter = require('express').Router();

const UserRequest = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contact: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message:Joi.string().optional()
});

userRouter.post("/user-form",(async (req, res) => {
    try {
        const reqBody = await UserRequest.validateAsync(req.body);
        const authServ = new UserService(reqBody, res, req.user);
        const data = await authServ.userForm();

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

userRouter.get("/users",(async (req, res) => {
    try {
        const userService = new UserService(req, res, req.query);
        const users = await userService.getAllUsers();
        res.json({ message: "users retrieved successfully.", users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));



module.exports = userRouter;
