
var modules = [];

var add = function add(module) {
  modules.push(module);
};

add.list = function list() {
  return modules;
};

var exports = module.exports = add;

