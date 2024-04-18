const userRouter = require("../controllers/common");
const inquiryRouter = require("../controllers/Inquiry");
const resumeRouter = require("../controllers/resume");


const appRouter = require("express").Router();

appRouter.use('/api', userRouter);
appRouter.use('/api', inquiryRouter);
appRouter.use('/api', resumeRouter);

module.exports = appRouter;