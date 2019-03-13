module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000); // longer than two ec will get an error
};

module.exports.square = (a, b) => a * b;

module.exports.setName = (user, fullName) => {
  var names = fullName.split(" ");
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};
