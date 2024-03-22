import { Request, Response } from "express"
import { timetableService } from "../../services/timetable/timetable.services"

const getTimetable = async (req: Request, res: Response) => {
  const data = await timetableService.getTimetable(req.params.id, req.query.status as string, req.body.month as number, req.body.year as number)
  res.status(200).json({ success: true, data })
}

export const timetableController = {
  getTimetable
}
