import express from "express";
import geoController from "../controllers/geoController";

const router = express.Router();

router.post("/create", geoController.createGeo);
router.put("/edit/:id", geoController.updateGeo);
router.delete("/remove/:id", geoController.deleteGeo);
router.get("/get/:id", geoController.getGeo);
router.get("/get-all/", geoController.getGeoAll);

export default router;