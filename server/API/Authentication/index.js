const express = require("express");
const bcrypt = require("bcryptjs");

//Models
const { UserModel } = require("../../database/user/index");

const Router = express.Router();

/*
ROUTE       :   /signup
DESCRIPTION :   Register new user
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/signup", async (req, res) => {
  try {
    await UserModel.findUserByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "Signup success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /signin
DESCRIPTION :   login  user
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findUserByEmailAndPassword(
      req.body.credentials
    );
    const token = user.generateJwtToken();
    return res
      .status(200)
      .json({ userRole: user.userRole, token, status: "Signin success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route     /change-password
Des       change user password
Params    none
Access    Public
Method    POST
*/
Router.post("/change-password", async (req, res) => {
  try {
    const data = await req.body;
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(data.password, bcryptSalt);
    const updateData = {
      password: hashedPassword,
    };
    await UserModel.findOneAndUpdate(
      { _id: data._id },
      {
        $set: {
          password: updateData.password,
        },
      }
    );
    return res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = Router;
