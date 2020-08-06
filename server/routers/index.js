const router = require("express").Router();

// Kemungkinan besar pas merge pasti conflict

const movieRouter = require("./movies");
const userRouter = require("./users")

router.use("/users", userRouter)
router.use("/todos", movieRouter)

module.exports = router;
