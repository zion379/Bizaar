const utils = require("./utils");

const expect = require("expect");

it("should add two numbers", () => {
  var res = utils.add(33, 11);

  expect(res)
    .toBe(44)
    .toBeA("number");
});

// async test wont be finished unitll done is called
it("should async add two numbers", done => {
  utils.asyncAdd(4, 3, sum => {
    expect(sum)
      .toBe(7)
      .toBeA("number");
    done();
  });
});

it("should square two numbers", () => {
  var res = utils.square(2, 2);
  expect(res)
    .toBe(4)
    .toBeA("number");
});

it("should set firstname and lastname", () => {
  var user = { location: "Washington", age: 18 };
  var res = utils.setName(user, "zion johnson");

  expect(res).toInclude({ firstName: "zion", lastName: "johnson" });
});
