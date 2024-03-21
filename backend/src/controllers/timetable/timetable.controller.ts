import { Request, Response } from "express"
import { timetableService } from "../../services/timetable/timetable.services"

const getTimetable = async (req: Request, res: Response) => {
  const data = await timetableService.getTimetable(req.params.id)
  res.status(200).json({ success: true, data })
}

export const timetableController = {
  getTimetable
}
