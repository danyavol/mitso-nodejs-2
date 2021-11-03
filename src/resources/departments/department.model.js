const { v4: uuid } = require('uuid');

class Department {
    constructor(department = {}) {
        this.id = department.id || uuid();
        this.name = department.name;
    }

    static toResponse(department) {
        const { id, name } = department;
        return { id, name };
    }
}

module.exports = Department;
