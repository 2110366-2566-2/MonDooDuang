import { db } from "../configs/pgdbConnection"
import { AppointmentSchema } from "../models/appointment/appointment.model"

export const appointmentRepository = {
  createAppointment: async (appointment: AppointmentSchema) => {
    try {
      await db.query(
        `
          INSERT INTO APPOINTMENT (status, package_id, customer_id, fortune_teller_id, appointment_date) 
          VALUES($1, $2, $3, $4, $5);
        `, [appointment.status, appointment.packageId, appointment.customerId, appointment.fortuneTellerId, appointment.appointmentDate]
      )
      return true
    } catch (err) {
      return false
    }
  },

  getFortuneTellerAppointment: async (fortuneTellerId: string) => {
    const result = await db.query(
      `SELECT A.appointment_date , P.duration
      FROM appointment A,package P
      WHERE A.package_id = P.package_id and A.fortune_teller_id = $1 
      and A.status = 'WAITING_FOR_EVENT';`, [fortuneTellerId]
    )
    return result.rows
  },
  getUserInfo: async (userId: string) => {
    const result = await db.query(
      `SELECT user_id,fname,lname,phone_number,birth_date
      FROM user_table
      WHERE user_id = $1;`, [userId]
    )
    return result.rows[0]
  }
}
