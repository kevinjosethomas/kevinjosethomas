import path from "path";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFIle(path.join(__dirname, "/public/views/socials.html"));
});

export default router;
