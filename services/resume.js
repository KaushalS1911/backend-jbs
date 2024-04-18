const BaseService = require(".");
const Resume = require('../models/resume');


class ResumeService extends BaseService {
    constructor(req, res, reqQuery) {
        super();
        this.req = req;
        this.res = res;
        this.reqQuery = reqQuery;
    }

    async resumeForm(resume_file) {
        const {
            firstName,
            lastName,
            contact,
            email,
            location,
            technology,
            experience,
            current_sal,
            expected_sal,
            availability,
        } = this.req;


        const newResume = new Resume({
            firstName,
            lastName,
            contact,
            email,
            location,
            technology,
            experience,
            current_sal,
            expected_sal,
            availability,
            resume_file
        });

        const resume = await newResume.save();

        return resume;
    }
}

module.exports = ResumeService;