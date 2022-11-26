const a = "test@test.com";
const b = "test";
// JSON.parse("mail_address", a);

const myObj = {
  mail_address: a,
  password: b,
};

const myObjStr = JSON.stringify(myObj);

console.log(myObjStr);
