import { db } from "../configs/pgdbConnection"
import { AppointmentSchema } from "../models/appointment/appointment.model"

export const appointmentRepository = {
  createAppointment: async (appointment: AppointmentSchema) => {
    try {
      const result = await db.query(
        `
          INSERT INTO APPOINTMENT (status, package_id, customer_id, fortune_teller_id, appointment_date) 
          VALUES($1, $2, $3, $4, $5)
          RETURNING *;
        `, [appointment.status, appointment.packageId, appointment.customerId, appointment.fortuneTellerId, appointment.appointmentDate]
      )

      return { isSuccess: true, appointmentId: result.rows[0].appointment_id }
    } catch (err) {
      return { isSuccess: false, appointmentId: "" }
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

  getAppointmentStatus: async (appointmentId: string) => {
    const result = await db.query(
      `
        SELECT status
        FROM APPOINTMENT
        WHERE appointment_id = $1;
      `, [appointmentId]
    )

    if (result.rowCount === 0) { return null }
    return result.rows[0].status
  },

  getUserInfo: async (userId: string) => {
    const result = await db.query(
      `SELECT user_id,fname,lname,phone_number,birth_date
      FROM user_table
      WHERE user_id = $1;`, [userId]
    )

    return result.rows[0]
  },
  getAppointmentByConversationId: async (conversationId: string) => {
    const userId = await db.query(
      `
        SELECT customer_id, fortune_teller_id
        FROM conversation
        WHERE conversation_id = $1
      `, [conversationId]
    )
    if (userId.rowCount === 0) return []
    const { customer_id: customerId, fortune_teller_id: fortuneTellerId } = userId.rows[0]
    const result = await db.query(
      `
        SELECT A.appointment_id, A.status, A.customer_id, A.fortune_teller_id, A.appointment_date, P.speciality, P.duration, P.price
        FROM APPOINTMENT A
        JOIN PACKAGE P ON A.package_id = P.package_id
        WHERE (A.customer_id = $1 AND A.fortune_teller_id = $2)
      `, [customerId, fortuneTellerId]
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
  }
}
