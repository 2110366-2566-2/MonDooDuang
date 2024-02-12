import { db } from "../configs/pgdbConnection"
import { SearchSchema } from "../models/search/search.model"

export const searchRepository = {
  searchFortuneteller: async (searchOption: SearchSchema) => {
    const { name, speciality, minPrice, maxPrice, startTime, endTime, startDate, endDate, rating } =
      searchOption
    const query = `WITH FILTER_PACKAGE AS (
                        SELECT * FROM package
                        ${speciality !== "" || maxPrice !== -1 ? "WHERE" : ""}
                        ${speciality === "" ? "" : `speciality = '${speciality}'`}
                        ${speciality !== "" && maxPrice !== -1 ? "AND" : ""}
                        ${maxPrice === -1 ? "" : `price >= ${minPrice} AND price <= ${maxPrice}`}
                    ), 
                    APPOINTMENT_DATE_RANGE AS(
                        SELECT A.appointmentdate AS startdate, A.appointmentdate + (FP.duration || ' minutes')::interval AS enddate, FP.packageid 
                        FROM FILTER_PACKAGE FP
                        JOIN appointment A ON FP.packageid = A.packageid
                    ), 
                    FILTER_APPOINTMENT AS (
                        SELECT FP.packageid, FP.speciality, FP.price, FP.fortunetellerid FROM FILTER_PACKAGE FP
                        LEFT OUTER JOIN appointment A ON FP.packageid = A.packageid
                        LEFT OUTER JOIN APPOINTMENT_DATE_RANGE R ON FP.packageid = R.packageid
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
                        SELECT DISTINCT FA.speciality, FA.packageid, FA.fortunetellerid, FT.stagename, U.fname, U.profilepicture, FT.totalscore, FT.totalreview FROM FILTER_APPOINTMENT FA
                        JOIN fortune_teller FT ON FA.fortunetellerid = FT.fortunetellerid
                        JOIN user_table U ON FA.fortunetellerid = U.userid
                        WHERE (CASE
                            WHEN FT.stagename IS NULL THEN LOWER(U.fname)
                            ELSE LOWER(FT.stagename)
                        END) LIKE '${name}'
                        AND (CASE
                            WHEN FT.totalreview > 0 THEN (FT.totalscore / FT.totalreview)
                            ELSE 0
                        END) >= ${rating}
                    ),
                    FORTUNETELLER_PACKAGE AS (
                        SELECT F.fortunetellerid, F.stagename, F.fname, F.profilepicture, 
                        F.totalscore, F.totalreview, 
                        STRING_AGG(DISTINCT F.packageid, ',') AS current_packageid,
                        STRING_AGG(DISTINCT P.packageid, ',') AS packageid_list,
                        ARRAY_TO_STRING(ARRAY_AGG(DISTINCT F.speciality), ',') AS current_speciality,
                        ARRAY_TO_STRING(ARRAY_AGG(DISTINCT P.speciality), ',') AS speciality_list,
                        MIN(P.price) AS minPrice,
                        MAX(P.price) AS maxPrice
                        FROM INTEGRATE_FORTUNETELLER F
                        JOIN package P ON F.fortunetellerid = P.fortunetellerid
                        GROUP BY F.fortunetellerid, F.stagename, F.fname, F.profilepicture, F.totalscore, F.totalreview
                    )
                    
                    SELECT * FROM FORTUNETELLER_PACKAGE`

    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  }
}
