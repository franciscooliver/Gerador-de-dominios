const database = require("./database");

exports.getItemsByType = type => {
  return database.execute("select * from item where type = ?", [type]);
};

exports.getItemById = id => {
  return database.execute("select * from item where id = ?", [id]);
};

exports.getItems = () => {
  return database.execute("select * from item");
};

exports.saveItem = item => {
  return database.execute("insert into item set ?", item);
};

exports.deleteItem = id => {
  return database.execute("delete from item where id = ?", [id]);
};
