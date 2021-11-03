const projectRepo = require('./project.memory.repository');

const getAll = () => projectRepo.getAll();

module.exports = { getAll };