import express from "express"
import { appointmentController } from "../controllers/appointment/appointment.controller"

const router = express.Router()

router.get("/find-user/:userId", appointmentController.getUserInfo)
router.get("/find-fortunetellers", appointmentController.getAllFortuneTeller)
router.get("/find-fortuneteller/:fortuneTellerId", appointmentController.getFortuneTeller)
router.get("/find-packages/:fortuneTellerId", appointmentController.getPackages)
router.get("/find-appointments/:fortuneTellerId", appointmentController.getFortuneTellerAppointment)
router.get("/find-appointment-by-conversationId/:conversationId", appointmentController.getAppointmentByConversationId)
router.post("/create-appointment", appointmentController.createAppointment)
router.post("/update-appointment-status", appointmentController.updateAppointmentStatus)
router.get("/getIsReview/:appointmentId/:customerId", appointmentController.getIsReview)
router.get("/find-event-completed-appointments", appointmentController.getEventCompletedAppointments)

export default router
