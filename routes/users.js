const router = require("express").Router();
const hbs = require("hbs");
const path = require("path");

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");

const template_path = path.join(__dirname,"../template/views");
//router.set("view engine", "hbs");
//router.set("views", template_path);

router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});


router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});



router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});



router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});


router.get(
  "/user-protectd",
  async (req, res) => {
    //return res.json("Hello User");
     res.render("user_redirect")
  }
);


router.get(
  "/admin-protectd",
  async (req, res) => {
    //return res.json("Hello Admin");
    res.render("admin_redirect")
  }
);

module.exports = router;
