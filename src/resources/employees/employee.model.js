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
        if (employee == null) return null;
        const { id, firstName, lastName, skillLevel, salary, department, project } = employee;
        return { id, firstName, lastName, skillLevel, salary, department, project };
    }

    update(payload) {
        const { firstName, lastName, skillLevel, salary, department, project } = payload;
        if (firstName !== undefined) this.firstName = firstName;
        if (lastName !== undefined) this.lastName = lastName;
        if (skillLevel !== undefined) this.skillLevel = skillLevel;
        if (salary !== undefined) this.salary = salary;
        if (department !== undefined) this.department = department;
        if (project !== undefined) this.project = project;

        return this;
    }
}

module.exports = Employee;
