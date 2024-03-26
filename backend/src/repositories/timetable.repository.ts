import { db } from "../configs/pgdbConnection"

const getTimetable = async (userID: string, status: string, day: number, month: number, year: number) => {
  const query = `WITH EVENT_SELECTED AS (
                    SELECT customer_id, fortune_teller_id, package_id, 
                    appointment_date + (7 || ' hours')::interval AS appointment_date, 
                        CASE
                            WHEN '${userID}' = fortune_teller_id THEN 'FORTUNETELLER'
                            WHEN '${userID}' = customer_id THEN 'CUSTOMER'
                        END AS event_role
                    FROM appointment
                    WHERE (appointment_date + (7 || ' hours')::interval)::date > '${year.toString()}-${month.toString()}-${day === -1 ? "1" : day.toString()} 00:00:00'::timestamp
                    AND (appointment_date + (7 || ' hours')::interval)::date < '${month === 12 ? (year + 1).toString() : year.toString()}-${month === 12 ? "1" : (month + 1).toString()}-1 00:00:00'::timestamp
                    ${status === "upcoming"
    ? "AND status = 'WAITING_FOR_EVENT'"
    : status === "completed" ? "AND status IN ('EVENT_COMPLETED', 'NO_FRAUD_DETECTED', 'PAYMENT_COMPLETED', 'SUSPENDED')" : ""}
                    AND ( '${userID}' = fortune_teller_id
                        OR '${userID}' = customer_id )
                ), EVENT_TIME AS (
                    SELECT appointment_date::date, appointment_date::time AS appointment_start_time, 
                    appointment_date::time + (p.duration || ' minutes')::interval AS appointment_end_time,
                    e.customer_id, e.fortune_teller_id, e.event_role, p.speciality
                    FROM EVENT_SELECTED e
                    JOIN package p ON p.package_id = e.package_id 
                ), EVENT_CUSTOMER_NAME AS (
                    SELECT e.appointment_date, e.appointment_start_time, e.appointment_end_time, e.fortune_teller_id,
                    e.event_role, e.speciality, fname AS customer_fname, lname AS customer_lname
                    FROM EVENT_TIME e
                    JOIN user_table u
                    ON e.customer_id = u.user_id
                ), EVENT_FORTUNETELLER_NAME AS (
                    SELECT e.appointment_date, e.appointment_start_time, e.appointment_end_time, 
                    e.event_role, e.speciality, e.customer_fname, e.customer_lname,
                        CASE 
                            WHEN f.stage_name IS NULL THEN u.fname
                            WHEN f.stage_name IS NOT NULL THEN f.stage_name
                        END AS fortune_teller_name
                    FROM EVENT_CUSTOMER_NAME e
                    JOIN fortune_teller f
                    ON e.fortune_teller_id = f.fortune_teller_id
                    JOIN user_table u
                    ON f.fortune_teller_id = u.user_id
                )
                SELECT * FROM EVENT_FORTUNETELLER_NAME
                ORDER BY appointment_date, appointment_start_time;`
  const result = await db.query(query)
  if (result.rowCount === 0) { return null }
  return result.rows
}

export const timetableRepository = {
  getTimetable
}
