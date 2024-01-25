const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const sharp = require("../middleware/sharp-config");

const multer = require("../middleware/multer-config");

const bookCtrl = require("../controllers/bookController");

router.post("/", auth, multer, sharp, bookCtrl.createBook);
router.put("/:id", auth, multer, sharp, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.ratingBook);
router.get("/bestrating", bookCtrl.bestRatings);
router.get("/:id", bookCtrl.getOneBook);
router.get("/", bookCtrl.getAllBooks);

module.exports = router;
