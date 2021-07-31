const config = require('config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const moment = require('moment');

const Audit = db.Audit

module.exports = {
    createAudit, getAll
}

async function createAudit({ token, loggedOutAt }) {
    try {
        const { username, ipAddress, isAuditor, loggedInAt } = jwt.verify(token, config.secret);
        const logoutTime = moment(loggedOutAt).format('LLLL');

        let audit = new Audit({ username, ipAddress, loggedInAt, loggedOutAt: logoutTime });
        if (isAuditor) audit.profile = 'Auditor';
        await audit.save();
        return 'Audit record added successfully!';

    } catch (ex) { throw ex; }
}

async function getAll() {
    return await Audit.find().select('-_id');
}