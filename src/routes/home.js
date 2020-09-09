import path from "path";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/views/home.html"))
})

export default router;
