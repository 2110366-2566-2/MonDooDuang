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
  },
  getAppointmentByBothUserId: async (firstUserId: string, secondUserId: string) => {
    const result = await db.query(
      `
        SELECT A.appointment_id, A.status, A.customer_id, A.fortune_teller_id, A.appointment_date, P.speciality, P.duration, P.price
        FROM APPOINTMENT A
        JOIN PACKAGE P ON A.package_id = P.package_id
        WHERE (A.customer_id = $1 AND A.fortune_teller_id = $2) OR (A.customer_id = $2 AND A.fortune_teller_id = $1)
      `, [firstUserId, secondUserId]
    )
    return result.rows.map((row) => {
      return {
        appointmentId: row.appointment_id,
        status: row.status,
        customerId: row.customer_id,
        fortuneTellerId: row.fortune_teller_id,
        appointmentDate: row.appointment_date,
        speciality: row.speciality,
        duration: row.duration,
        price: row.price
      }
    })
  },
  updateAppointmentStatus: async (appointmentId: string, status: string) => {
    try {
      await db.query(
        `
          UPDATE APPOINTMENT
          SET status = $1
          WHERE appointment_id = $2;
        `, [status, appointmentId]
      )
      return true
    } catch (err) {
      return false
    }
  },
  getIsReview: async (appointmentId: string, customerId: string) => {
    const result = await db.query(
      `SELECT appointment_id, customer_id
      FROM review
      WHERE appointment_id = '${appointmentId}' and customer_id = '${customerId}'`
    )
    if (result.rows.length === 0) return false
    return true
  }
}
