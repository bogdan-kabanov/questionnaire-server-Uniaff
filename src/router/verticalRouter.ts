import express from "express";
import verticalController from "../controllers/verticalController";

const router = express.Router();

router.post("/create", verticalController.createVertical);
router.put("/edit/:id", verticalController.updateVertical);
router.delete("/remove/:id", verticalController.deleteVertical);
router.get("/get/:id", verticalController.getVertical);
router.get("/get-all/", verticalController.getVerticalAll);

export default router;