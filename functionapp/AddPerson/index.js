const PeopleDbContext = require('../DataAccess/db-context');
const common = require('./../common');

module.exports = async function (context, req) {
    await common.functionWrapper(context, req, async (body) => {
        context.log("executing");
        const connectionString = process.env['PeopleDb'];
        const peopleDb = new PeopleDbContext(connectionString, context.log);
        body.response = await peopleDb.addPerson(req.body);
    });
}