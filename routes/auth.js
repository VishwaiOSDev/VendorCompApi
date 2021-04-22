const router = require("express").Router();
const User = require("../model/User");
const Product = require("../model/Product");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;
const verify = require("./verification");

router.post("/register", async (req, res) => {
  //Checkpassword and ConfirmPassword
  const password = req.body.password;

  //Hash passwords
  const salt = await bcrypt.genSalt(11);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create New User
  const new_user = new User({
    id: uuid(),
    email: req.body.email,
    password: hashPassword,
  });

  try {
    await new_user.save();

    const token = generateJWT(new_user.id);

    res.header("auth-token", token).json({ message: token });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  //Check if email is registered
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Email or Password is invalid." });

  //Check for password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send({ message: "Email or Password is invalid." });

  //Create and assign a token
  const token = generateJWT(user.id);

  console.log("Login Triggered");
  res.header("auth-token", token).json({ message: token });
});

//Generate JWT Token
function generateJWT(userid) {
  return jwt.sign({ id: userid }, "this_secret_key", { expiresIn: "30d" });
}

router.post("/prod", verify, async (req, res) => {
  const details = new Product({
    id: uuid(),
    prodname: req.body.prodname,
    price: req.body.price,
    gstamount: req.body.gstamount,
    deliverycharge: req.body.deliverycharge,
    offer: req.body.offer,
  });

  console.log("Came inside");
  try {
    await details.save();
    res.status(200).json({ message: "Details Updated" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/all", async (req, res) => {
  Product.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    res.json(result);
  });
});

module.exports = router;
