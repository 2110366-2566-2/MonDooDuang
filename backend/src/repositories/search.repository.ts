import { db } from "../configs/pgdbConnection"
import { SearchSchema } from "../models/search/search.model"

export const searchRepository = {
  searchFortuneteller: async (searchOption: SearchSchema) => {
    const { name, speciality, minPrice, maxPrice, startTime, endTime, startDate, endDate, rating } =
      searchOption
    const query = `WITH FILTER_PACKAGE AS (
                        SELECT * FROM PACKAGE
                        ${speciality !== "" || maxPrice !== -1 ? "WHERE" : ""}
                        ${speciality === "" ? "" : `speciality = '${speciality}'`}
                        ${speciality !== "" && maxPrice !== -1 ? "AND" : ""}
                        ${maxPrice === -1 ? "" : `price >= ${minPrice} AND price <= ${maxPrice}`}
                    ), 
                    APPOINTMENT_DATE_RANGE AS(
                        SELECT A.appointment_date AS startdate, A.appointment_date + (FP.duration || ' minutes')::interval AS enddate, FP.package_id 
                        FROM FILTER_PACKAGE FP
                        JOIN APPOINTMENT A ON FP.package_id = A.package_id
                    ), 
                    FILTER_APPOINTMENT AS (
                        SELECT FP.package_id, FP.speciality, FP.price, FP.fortune_teller_id FROM FILTER_PACKAGE FP
                        LEFT OUTER JOIN APPOINTMENT A ON FP.package_id = A.package_id
                        LEFT OUTER JOIN APPOINTMENT_DATE_RANGE R ON FP.package_id = R.package_id
                        ${
  startDate === ""
    ? startTime === ""
      ? ""
      : `WHERE CASE
                                  WHEN  R.startdate IS NULL OR R.enddate IS NULL 
                                  OR (R.startdate::time >= '${startTime}'::time + (FP.duration || ' minutes')::interval - (7 || ' hours')::interval
                                  OR R.enddate::time <= '${endTime}'::time - (FP.duration || ' minutes')::interval - (7 || ' hours')::interval)
                                  THEN 1
                                  WHEN A.status NOT IN ('WAITING_FOR_PAYMENT', 'WAITING_FOR_EVENT')
                                  THEN 1
                                  ELSE 0
                                END > 0`
    : `WHERE CASE
                                WHEN  R.startdate IS NULL OR R.enddate IS NULL 
                                OR (R.startdate >= ('${startDate} ${startTime}'::timestamp + (FP.duration || ' minutes')::interval - (7 || ' hours')::interval)
                                OR R.enddate <= ('${endDate} ${endTime}'::timestamp - (FP.duration || ' minutes')::interval - (7 || ' hours')::interval))
                                THEN 1
                                WHEN A.status NOT IN ('WAITING_FOR_PAYMENT', 'WAITING_FOR_EVENT')
                                THEN 1
                                ELSE 0
                              END > 0`
}
                    ), 
                    INTEGRATE_FORTUNETELLER AS (
                        SELECT DISTINCT FA.speciality, FA.package_id, FA.fortune_teller_id, FT.stage_name, U.fname, U.profile_picture, FT.total_score, FT.total_review FROM FILTER_APPOINTMENT FA
                        JOIN FORTUNE_TELLER FT ON FA.fortune_teller_id = FT.fortune_teller_id
                        JOIN USER_TABLE U ON FA.fortune_teller_id = U.user_id
                        WHERE (CASE
                            WHEN FT.stage_name IS NULL THEN LOWER(U.fname)
                            ELSE LOWER(FT.stage_name)
                        END) LIKE '${name}'
                        AND (CASE
                            WHEN FT.total_review > 0 THEN (FT.total_score / FT.total_review)
                            ELSE 0
                        END) >= ${rating}
                    ),
                    FORTUNETELLER_PACKAGE AS (
                        SELECT F.fortune_teller_id, F.stage_name, F.fname, F.profile_picture, 
                        F.total_score, F.total_review, 
                        STRING_AGG(DISTINCT P.package_id, ',') AS package_id_list,
                        P.speciality,
                        MIN(P.price) AS min_price,
                        MAX(P.price) AS max_price
                        FROM INTEGRATE_FORTUNETELLER F
                        JOIN package P ON F.fortune_teller_id = P.fortune_teller_id
                        GROUP BY F.fortune_teller_id, F.stage_name, F.fname, F.profile_picture, F.total_score, F.total_review, P.speciality
                    )
                    
                    SELECT * FROM FORTUNETELLER_PACKAGE`

    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  }
}
