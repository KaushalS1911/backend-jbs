const BaseService = require(".");
const Inquiry = require('../models/Inquiry');
const moment = require('moment');


class InquiryService extends BaseService {
    constructor(req, res, reqQuery) {
        super();
        this.req = req;
        this.res = res;
        this.reqQuery = reqQuery;
    }

    async inquiryForm() {
        const {
            firstName,
            lastName,
            contact,
            email,
            courses
        } = this.req;

        const isUserExists = await Inquiry.findOne({ $or: [{ contact }, { email }] });


        if (isUserExists) {
            throw new Error("user already exists.");
        }

        const newUser = new Inquiry({
            firstName,
            lastName,
            contact,
            email,
            courses
        });

        const savedUser = await newUser.save();

        return savedUser;
    }

    async getAllinquiry() {
        const selectedMonth = this.reqQuery.month ? moment(this.reqQuery.month) : moment();

        const currentMonthStart = selectedMonth.startOf('month').toDate();
        const currentMonthEnd = selectedMonth.endOf('month').toDate();

        const users = await Inquiry.find({
            created_at: {
                $gte: currentMonthStart,
                $lte: currentMonthEnd,
            },
        });

        const userOverView = users.map(user => {
            const formattedDate = moment(user.created_at).format('DD-MM-YYYY');
            return {
                firstName:user.firstName,
                lastName:user.lastName,
                contact:user.contact,
                email:user.email,
                courses:user.courses,
                date:formattedDate,
                id:user._id
            };
        });

        return userOverView;
    }
}

module.exports = InquiryService;