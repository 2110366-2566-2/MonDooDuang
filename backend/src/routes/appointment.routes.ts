import express from "express"
import { appointmentController } from "../controllers/appointment/appointment.controller"

const router = express.Router()

router.get("/find-user/:userId", appointmentController.getUserInfo)
router.get("/find-fortunetellers", appointmentController.getAllFortuneTeller)
router.get("/find-fortuneteller/:fortuneTellerId", appointmentController.getFortuneTeller)
router.get("/find-packages/:fortuneTellerId", appointmentController.getPackages)
router.get("/find-appointments/:fortuneTellerId", appointmentController.getFortuneTellerAppointment)
router.post("/create-appointment", appointmentController.createAppointment)

export default router