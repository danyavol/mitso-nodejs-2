const { v4: uuid } = require('uuid');

class Project {
    constructor(project = {}) {
        this.id = project.id || uuid();
        this.name = project.name;
        this.description = project.description;
        this.client = project.client;
    }

    static toResponse(project) {
        if (project == null) return null;
        const { id, name, description, client } = project;
        return { id, name, description, client };
    }

    update(payload) {
        const { name, description, client } = payload;
        if (name !== undefined) this.name = name;
        if (description !== undefined) this.description = description;
        if (client !== undefined) this.client = client;

        return this;
    }
}

module.exports = Project;
