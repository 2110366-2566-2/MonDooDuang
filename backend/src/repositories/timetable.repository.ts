import { db } from "../configs/pgdbConnection"

const getTimetable = async (userID: string) => {
  const query = ""
  const result = await db.query(query)
  if (result.rowCount === 0) { return null }
  return result.rows
}

export const timetableRepository = {
  getTimetable
}
