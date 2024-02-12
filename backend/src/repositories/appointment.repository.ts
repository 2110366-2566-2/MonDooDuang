import { db } from "../configs/pgdbConnection"
import { AppointmentSchema } from "../models/appointment/appointment.model"

export const appointmentRepository = {
  createAppointment: async (appointment: AppointmentSchema) => {
    try {
      await db.query(
        `
          INSERT INTO APPOINTMENT (status, packageid, customerid, fortunetellerid, appointmentdate) 
          VALUES($1, $2, $3, $4, $5);
        `, [appointment.status, appointment.packageId, appointment.customerId, appointment.fortuneTellerId, appointment.appointmentDate]
      )
      return true
    } catch (err) {
      return false
    }
  },
  getFortuneTeller: async (fortuneTellerId: string) => {
    const result = await db.query(
      `SELECT FortuneTellerId, StageName
      FROM fortune_teller as F
      WHERE F.fortunetellerid = $1;`, [fortuneTellerId]
    )
    return result
  },
  getAllFortuneTeller: async () => {
    const result = await db.query(
      `SELECT FortuneTellerId, StageName
       FROM fortune_teller
      `
    )
    return result
  },
  getPackages: async (fortuneTellerId: string) => {
    const result = await db.query(
      `SELECT P.packageid,P.speciality,P.duration,P.price
      FROM package as P
      WHERE P.fortunetellerid = $1;`, [fortuneTellerId]
    )
    return result
  },
  getFortuneTellerAppointment: async (fortuneTellerId: string) => {
    const result = await db.query(
      `SELECT A.appointmentdate , P.duration
      FROM appointment A,package P
      WHERE A.packageId = P.packageId and A.fortunetellerid = $1 
      and A.status = 'WAITING_FOR_EVENT';`, [fortuneTellerId]
    )
    return result
  },
  getUserInfo: async (userId: string) => {
    const result = await db.query(
      `SELECT userid,fname,lname,phonenumber,birthdate
      FROM user_table
      WHERE userid = $1;`, [userId]
    )

    return result
  }
}
