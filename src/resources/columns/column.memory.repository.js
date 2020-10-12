const Column = require('./column.model');

const create = body => new Column(body);

module.exports = { create };
