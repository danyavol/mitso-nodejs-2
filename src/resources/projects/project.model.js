const { v4: uuid } = require('uuid');

class Project {
    constructor(project = {}) {
        this.id = project.id || uuid();
        this.name = project.name;
        this.description = project.description;
        this.client = project.client;
    }

    static toResponse(project) {
        const { id, name, description, client } = project;
        return { id, name, description, client };
    }
}

module.exports = Project;
