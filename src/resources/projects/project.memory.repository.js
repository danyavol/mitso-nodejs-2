const projects = [
    {
        id: 'ddf32c7a-e535-4b8f-bb99-66fb3954cc30',
        name: 'Felix',
        description: 'Modern web project',
        client: 'Apple'
    },
    {
        id: '30fde770-8900-4f21-b1df-0372077c8737',
        name: 'Google Dashboard',
        description: 'Dashboard for google users',
        client: 'Google'
    },
    {
        id: '84b0f5b6-ae50-43b6-8789-aec63cdc994b',
        name: 'Instagram',
        description: 'Mobile and web application with photos',
        client: 'Meta'
    }
];

async function getAll() {
    return projects;
};

async function getById(id) {
    return projects.find(d => d.id === id) || null;
};

async function insert(employee) {
    return projects.push(employee);
};

async function deleteById(id) {
    const index = projects.findIndex(d => d.id === id);
    if (index === -1) return null;
    return projects.splice(index, 1)[0];
};

async function replaceById(id, employee) {
    const index = projects.findIndex(d => d.id === id);
    if (index === -1) return null;
    projects[index] = employee;
    return employee;
}

module.exports = { getAll, getById, insert, deleteById, replaceById };