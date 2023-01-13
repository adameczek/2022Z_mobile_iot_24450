const sql = require('mssql');
const parser = require('mssql-connection-string');

class PeopleDbContext {
    constructor(connectionString, log) {
        log("PeopleDbContext object has been created.");
        this.log = log;
        this.config = parser(connectionString);
        this.getPeople = this.getPeople.bind(this);
    }

    async getPeople() {
        this.log("getPeople function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('select * from People');
        this.log("getPeople function - done")
        return result.recordset;
    }

    async addPerson(person) {
        this.log("addPerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.PreparedStatement(connection);
        request.input('firstName', sql.VarChar);
        request.input('lastName', sql.VarChar);
        request.input('phoneNumber', sql.VarChar);

        return await request.prepare('Insert into People values (@firstName, @lastName, @phoneNumber)')
        .then(result => {
            this.log(result);
            return request.execute(person);
        })
        .then(result => {
            this.log(result);

            return result;
        })
        .catch(err => this.log(err));
    }

    async deletePerson(personId) {
        this.log("deletePerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.PreparedStatement(connection);
        request.input('id', sql.Int);

        return await request.prepare('DELETE from People WHERE PersonId = @id')
        .then(result => {
            this.log(result);
            
            return request.execute({id: personId});
        })
        .then(result => {
            this.log(result);

            return result;
        })
        .catch(err => {
            this.log(err);
        });
    }

    async getPerson(personId) {
        this.log("getPerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.PreparedStatement(connection);
        request.input('id', sql.Int);

        return await request.prepare('select * from People WHERE PersonId = @id')
        .then(result => {
            this.log(result);
            return request.execute({id: personId});
        })
        .then(result => {
            this.log(result);
            return result.recordset;
        })
        .catch(err => this.log(err))
    }
    
}

module.exports = PeopleDbContext;