const departments = [
    {
        id: '226b0228-2ba6-4ec4-80bf-f07f88920a7d',
        name: 'Frontend'
    },
    {
        id: '4bdcba2a-e18e-4d13-a4aa-2d3f492dd8f4',
        name: '.NET'
    },
    {
        id: 'c16f087c-d925-4e45-81dc-403b8f8ef96c',
        name: 'Quality Assurance'
    },
    {
        id: '45208e48-5c6b-4210-baa5-2e5e6742499e',
        name: 'Business Analysis'
    },
];


async function getAll() {
    return departments;
};

async function getById(id) {
    return departments.find(d => d.id === id) || null;
};

async function insert(department) {
    return departments.push(department);
};

async function deleteById(id) {
    const index = departments.findIndex(d => d.id === id);
    if (index === -1) return null;
    return departments.splice(index, 1)[0];
};

async function replaceById(id, department) {
    const index = departments.findIndex(d => d.id === id);
    if (index === -1) return null;
    departments[index] = department;
    return department;
}

module.exports = { getAll, getById, insert, deleteById, replaceById };