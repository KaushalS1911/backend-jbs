const BaseService = require(".");
const User = require('../models/auth');
const moment = require('moment');


class UserService extends BaseService {
    constructor(req, res, reqQuery) {
        super();
        this.req = req;
        this.res = res;
        this.reqQuery = reqQuery;
    }

    async userForm() {
        const {
            firstName,
            lastName,
            contact,
            email,
            subject,
            message
        } = this.req;

        const isUserExists = await User.findOne({ $or: [{ contact }, { email }] });


        if (isUserExists) {
            throw new Error("user already exists.");
        }

        const newUser = new User({
            firstName,
            lastName,
            contact,
            email,
            subject,
            message
        });

        const savedUser = await newUser.save();

        return savedUser;
    }

    async getAllUsers() {
        const selectedMonth = this.reqQuery.month ? moment(this.reqQuery.month) : moment();

        const currentMonthStart = selectedMonth.startOf('month').toDate();
        const currentMonthEnd = selectedMonth.endOf('month').toDate();

        const users = await User.find({
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
                subject:user.subject,
                message:user.message,
                date:formattedDate,
                id:user._id
            };
        });

        return userOverView;
    }
}

module.exports = UserService;
