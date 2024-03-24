import { db } from "../configs/pgdbConnection"
import { AppointmentSchema, AppointmentStatus } from "../models/appointment/appointment.model"

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
  updateAppointmentStatus: async (appointmentId: string, status: AppointmentStatus) => {
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
      `
      SELECT *
      FROM review
      WHERE appointment_id = '${appointmentId}' and customer_id = '${customerId}'
      `
    )
    if (result.rows.length === 0) return false
    return true
  },
  cancelAllFromBanFortuneTeller: async (userId: string) => {
    try {
      await db.query(
        `UPDATE APPOINTMENT
        SET status = 
            CASE 
                WHEN status = 'CREATED' THEN 'FORTUNE_TELLER_DECLINED'::appointment_status_enum
                WHEN status = 'WAITING_FOR_PAYMENT' THEN 
                    CASE 
                        WHEN fortune_teller_id = $1 THEN 'NO_PAYMENT_CANCELED'::appointment_status_enum
                        ELSE 'FORTUNE_TELLER_CANCELED'::appointment_status_enum
                    END
                WHEN status = 'WAITING_FOR_EVENT' THEN 'REFUNDED'::appointment_status_enum
                WHEN status IN ('EVENT_COMPLETED', 'SUSPENDED') THEN 'REFUNDED'::appointment_status_enum
            END
        WHERE 
            (customer_id = $1 AND status IN ('CREATED', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_EVENT'))
            OR (fortune_teller_id = $1 AND status IN ('CREATED', 'WAITING_FOR_PAYMENT', 'WAITING_FOR_EVENT', 'EVENT_COMPLETED', 'SUSPENDED'));
        
      `, [userId]
      )
      return { isSuccess: true, userId }
    } catch (err) {
      console.error(err)
      return { isSuccess: false }
    }
  },
  getEventCompletedAppointments: async () => {
    const result = await db.query(
      `
      SELECT A.appointment_id, P.price, CONCAT(C.fname,' ',C.lname) as c_full_name, CONCAT(FT.fname,' ',FT.lname) as ft_full_name, FT.profile_picture, FT.bank_name, FT.account_number
      FROM APPOINTMENT A
      JOIN PACKAGE P ON A.package_id = P.package_id
      JOIN USER_TABLE C ON A.customer_id = C.user_id
      JOIN USER_TABLE FT ON A.fortune_teller_id = FT.user_id
      WHERE A.status = $1 OR A.status = $2
      `, ["EVENT_COMPLETED", "NO_FRAUD_DETECTED"]
    )
    if (result.rowCount === 0) return []
    return result.rows.map((row) => {
      return {
        appointmentId: row.appointment_id,
        price: row.price,
        customerName: row.c_full_name,
        fortuneTellerName: row.ft_full_name,
        profilePicture: row.profile_picture,
        bankName: row.bank_name,
        accountNumber: row.account_number
      }
    })
  }
}
