const express = require("express");
const router = express.Router();
const User = require("../controller/UserController");

router.get("/", (req, res) => {
  var user = new User();
  user.saveUser({
    id: "1231545",
    name: "Joseaa",
    username: "Nicromanaaaao",
    email: "ljose297.com",
    password: "ano11",
  });

  res.send("okk");
});

module.exports = router;
