const employeeRepo = require('./employee.memory.repository');

const getAll = () => employeeRepo.getAll();

module.exports = { getAll };