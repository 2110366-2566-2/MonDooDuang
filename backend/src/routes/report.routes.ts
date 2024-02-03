import express from "express";
import {reportController} from "../controllers/report/report.controller"

const router = express.Router()

router.post("/",reportController.createReport)

export default router