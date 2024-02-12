import { Request, Response } from "express"
import { AppointmentSchema } from "../../models/appointment/appointment.model"
import { appointmentService } from "../../services/appointment/appointment.services"

const createAppointment = async (req: Request, res: Response) => {
  // Map request to schema
  const appointment: AppointmentSchema = {
    status: req.body.status,
    packageId: req.body.packageId,
    customerId: req.body.customerId,
    fortuneTellerId: req.body.fortuneTellerId,
    appointmentDate: req.body.appointmentDate
  }

  const isSuccess = await appointmentService.createAppointment(appointment)
  if (!isSuccess) { return res.status(400).json({ success: isSuccess }) }

  res.status(201).json({ success: isSuccess })
}

const getFortuneTeller = async (req: Request, res: Response) => {
  const fortuneTellerId = req.params.fortuneTellerId

  const fortuneTeller = await appointmentService.getFortuneTeller(fortuneTellerId)
  if (fortuneTeller === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ succcess: true, data: fortuneTeller })
}

const getAllFortuneTeller = async (req: Request, res: Response) => {
  const fortuneTellers = await appointmentService.getAllFortuneTeller()
  if (fortuneTellers === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: fortuneTellers })
}

const getPackages = async (req: Request, res: Response) => {
  const packages = await appointmentService.getPackages(req.params.fortuneTellerId)

  if (packages === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: packages })
}

const getFortuneTellerAppointment = async (req: Request, res: Response) => {
  const appointments = await appointmentService.getFortuneTellerAppointment(req.params.fortuneTellerId)

  if (appointments === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: appointments })
}

const getUserInfo = async (req: Request, res: Response) => {
  const userInfo = await appointmentService.getUserInfo(req.params.userId)

  if (userInfo === null) { return res.status(400).json({ success: false }) }

  res.status(200).json({ success: true, data: userInfo })
}

export const appointmentController = {
  createAppointment,
  getFortuneTeller,
  getAllFortuneTeller,
  getPackages,
  getFortuneTellerAppointment,
  getUserInfo
}
