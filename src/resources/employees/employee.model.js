const { v4: uuid } = require('uuid');

class Employee {
    constructor(employee = {}) {
        this.id = employee.id || uuid();
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.skillLevel = employee.skillLevel;
        this.salary = employee.salary;
        this.department = employee.department;
        this.project = employee.project;
    }

    static toResponse(employee) {
        const { id, firstName, lastName, skillLevel, salary, department, project } = employee;
        return { id, firstName, lastName, skillLevel, salary, department, project };
    }
}

module.exports = Employee;
