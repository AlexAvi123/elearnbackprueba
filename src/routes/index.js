const express = require("express");
const router = express.Router();
const User = require("../controller/UserController");

router.get("/", (req, res) => {
  var user = new User();
  user.saveUser({
    id: "123",
    name: "Jose",
    username: "Nicromano",
    email: "ljose297@gmail.com",
    password: "nicromano11",
  });

  res.send("okk");
});

module.exports = router;
