const { v4: uuid } = require('uuid');

class Department {
    constructor(department = {}) {
        this.id = department.id || uuid();
        this.name = department.name;
    }
}

module.exports = Department;
