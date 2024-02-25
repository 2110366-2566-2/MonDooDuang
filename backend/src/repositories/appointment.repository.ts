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

  getExpiredAppointment: async () => {
    const result = await db.query(
      `
        SELECT appointment_id
        FROM APPOINTMENT
        WHERE created_at <= NOW() - '1 day'::INTERVAL AND status = 'CREATED';
      `
    )

    const appointmentIds = result.rows.map(row => row.appointment_id)
    return appointmentIds

  },

  declineAppointment: async (appointmentIds: string[]) => {
    const query = appointmentIds.map((_, i) => `$${i + 1}`).join(", ")
    await db.query(
      `
        UPDATE APPOINTMENT
        SET status = 'FORTUNE_TELLER_DECLINED'
        WHERE appointment_id IN (${query});
      `,
      [...appointmentIds]
    )
  }
}
