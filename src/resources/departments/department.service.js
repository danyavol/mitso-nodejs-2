const departmentRepo = require('./department.memory.repository');

const getAll = () => departmentRepo.getAll();

module.exports = { getAll };