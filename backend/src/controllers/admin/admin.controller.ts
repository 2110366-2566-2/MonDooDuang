import { Request, Response } from "express"
import { adminService } from "../../services/admin/admin.services"
import { LoginAdminSchema } from "../../models/admin/admin.model"
import { TypedRequestBody } from "../../types/request"

const loginAdmin = async (req: Request, res: Response) => {
  const loginAdmin: LoginAdminSchema = {
    email: req.body.email,
    password: req.body.password
  }

  if (req.body.email === undefined || req.body.password === undefined) {
    return res.status(400).json({
      message: "Cannot log in, email or password is missing",
      success: false
    })
  }

  const result = await adminService.login(loginAdmin)
  const isSuccess = result.success

  if (!isSuccess) {
    return res.status(400).json(result)
  } else {
    return res.status(200).json(result)
  }
}

const payToFortuneTellerAndUpdateDB = async (req: TypedRequestBody<{ amount: number, appointmentId: string }>, res: Response) => {
  const { amount, appointmentId } = req.body
  const isSuccess = await adminService.payToFortuneTellerAndUpdateDB(amount, appointmentId)
  if (!isSuccess) return res.status(400).json({ success: false, message: "Failed to pay to fortune teller and update appointment status" })
  res.status(200).json({ success: isSuccess, message: "Paid to fortune teller and appointment status updated" })
}

export const adminController = {
  loginAdmin,
  payToFortuneTellerAndUpdateDB
}
