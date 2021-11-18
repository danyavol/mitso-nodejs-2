const employees = [
    {
        id: "e2404bd0-2dd8-4501-8133-35033ce3b7e0",
        firstName: "Decker",
        lastName: "Norris",
        skillLevel: "Junior",
        salary: 600,
        department: '226b0228-2ba6-4ec4-80bf-f07f88920a7d',
        project: 'ddf32c7a-e535-4b8f-bb99-66fb3954cc30'
    },
    {
        id: "540e3c49-7f39-408b-9dce-5b4918fa7051",
        firstName: "Crane",
        lastName: "Murray",
        skillLevel: "Middle",
        salary: 1900,
        department: '4bdcba2a-e18e-4d13-a4aa-2d3f492dd8f4',
        project: '84b0f5b6-ae50-43b6-8789-aec63cdc994b'
    },
    {
        id: "160de40c-ac27-4041-b9bc-4f87a06a1c98",
        firstName: "Merritt",
        lastName: "Pitts",
        skillLevel: "Senior",
        salary: 3600,
        department: '4bdcba2a-e18e-4d13-a4aa-2d3f492dd8f4',
        project: 'ddf32c7a-e535-4b8f-bb99-66fb3954cc30'
    },
    {
        id: "621574cd-ee2b-4ec6-97f6-b852d376e321",
        firstName: "Doyle",
        lastName: "Frost",
        skillLevel: "Senior",
        salary: 3900,
        department: 'c16f087c-d925-4e45-81dc-403b8f8ef96c',
        project: 'ddf32c7a-e535-4b8f-bb99-66fb3954cc30'
    },
    {
        id: "555f5450-f988-4de8-bb47-05b5ae83f805",
        firstName: "Martinez",
        lastName: "Glenn",
        skillLevel: "Middle",
        salary: 2200,
        department: '4bdcba2a-e18e-4d13-a4aa-2d3f492dd8f4',
        project: '30fde770-8900-4f21-b1df-0372077c8737'
    },
    {
        id: "3a6a4996-d9d6-4eb0-bdef-70f9a0c41097",
        firstName: "Zimmerman",
        lastName: "Cross",
        skillLevel: "Junior",
        salary: 900,
        department: '226b0228-2ba6-4ec4-80bf-f07f88920a7d',
        project: '30fde770-8900-4f21-b1df-0372077c8737'
    },
    {
        id: "4d6cc9b6-5985-442c-94c2-fd27441eceee",
        firstName: "Crawford",
        lastName: "Mills",
        skillLevel: "Middle",
        salary: 2000,
        department: '226b0228-2ba6-4ec4-80bf-f07f88920a7d',
        project: '84b0f5b6-ae50-43b6-8789-aec63cdc994b'
    },
    {
        id: "c10c0b07-a0c2-4e03-9242-8ff36a9efc4f",
        firstName: "Wooten",
        lastName: "Fuentes",
        skillLevel: "Senior",
        salary: 4100,
        department: '226b0228-2ba6-4ec4-80bf-f07f88920a7d',
        project: '30fde770-8900-4f21-b1df-0372077c8737'
    },
    {
        id: "223c05f4-3fd1-4be9-a1c6-7cd694d2ec93",
        firstName: "Moses",
        lastName: "Buckley",
        skillLevel: "Senior",
        salary: 4000,
        department: '45208e48-5c6b-4210-baa5-2e5e6742499e',
        project: '84b0f5b6-ae50-43b6-8789-aec63cdc994b'
    },
    {
        id: "db24cb8c-6e6c-46e6-b81e-4e7b0e0f78bf",
        firstName: "Mercado",
        lastName: "Bolton",
        skillLevel: "Middle",
        salary: 2500,
        department: 'c16f087c-d925-4e45-81dc-403b8f8ef96c',
        project: '84b0f5b6-ae50-43b6-8789-aec63cdc994b'
    }
];


async function getAll() {
    return employees;
};

async function getById(id) {
    return employees.find(d => d.id === id) || null;
};

async function insert(employee) {
    return employees.push(employee);
};

async function deleteById(id) {
    const index = employees.findIndex(d => d.id === id);
    if (index === -1) return null;
    return employees.splice(index, 1)[0];
};

async function replaceById(id, employee) {
    const index = employees.findIndex(d => d.id === id);
    if (index === -1) return null;
    employees[index] = employee;
    return employee;
}

module.exports = { getAll, getById, insert, deleteById, replaceById };