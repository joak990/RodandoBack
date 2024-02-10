const  { Router } = require ('express');
const router = Router();
const UsersRouter = require("./User");





router.use("/", UsersRouter);













module.exports = router