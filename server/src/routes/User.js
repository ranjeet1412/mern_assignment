import express from "express";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
//register
router.post("/register", async (req, res) => {
  const {
    username,
    email,
    firstname,
    lastname,
    role,
    password,
    birthdate,
    mobileno,
  } = req.body;
console.log(req.body)
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ message: "User Alredy Exsist!!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    email,
    firstname,
    lastname,
    birthdate,
    mobileno,
    role,
    password: hashedPassword,
  });
  console.log("users data to be saved");
  await newUser.save();
  res.json({ message: "User Registred successfully!" });
});
//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User Does not exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Password is incorrect!!" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id, role: user.role , firstname:JSON.stringify(user.firstname) });
});
//get all user
router.get("/getAllUsers", async (req, res) => {
  try {
    const allUser = await UserModel.find({});
    res.send({ data: allUser });
  } catch (error) {
    console.log(error);
  }
});
//for pagination
router.get("/paginatedUsers", async (req, res) => {
  try {
    const allUser = await UserModel.find({});
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};

    results.totalUser = allUser.length;
    results.pageCount = Math.ceil(allUser.length / limit);
    if (lastIndex < allUser.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.preve = {
        page: page - 1,
      };
    }

    results.result = allUser.slice(startIndex, lastIndex);

    res.json(results);
  } catch (error) {
    console.log(error);
  }
});
//for delete user
router.get("/deleteUsers", async (req, res) => {
  const { userId } = req.body;
  try {
    const deleteUser = await UserModel.deleteOne({ userId });
    res.send({ message: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
//get individual user
router.get("/individualUser/:id", async (req, res) => {
  //  console.log(req.params.id)
  try {
    const _id = req.params.id;
    const getIndividualUser = await UserModel.findById({ _id });
    res.send({ data: getIndividualUser });
  } catch (error) {
    console.log(error);
  }
});

//update user
router.put("/update/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const _id = req.params.id;
    const {
      username,
      email,
      firstname,
      lastname,
      role,
      password,
      birthdate,
      mobileno,
    } = req.body;
    console.log(req.body)
    const user = await UserModel.findOne({ email });
    console.log(email , "check")
    if (!user) {
      return res.json({ message: "User Does Not Exsist!!" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);

    const updateUser = await UserModel.findOneAndUpdate({_id}, {
      username,
      email,
      firstname,
      lastname,
      birthdate,
      mobileno,
      role,
      password,
    });
    res.send({ data: updateUser });
  } catch (error) {
    console.log(error);
  }
});

export { router as userRouter };
