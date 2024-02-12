import { db } from "../configs/pgdbConnection"
import { PackageSchema } from "../models/package/package.model"
import { SearchSchema } from "../models/search/search.model"

export const packageRepository = {
  getPackageByFortuneTellerId: async (fortuneTellerId: string): Promise< null | PackageSchema[] > => {
    const result = await db.query(
      `SELECT * FROM PACKAGE 
            WHERE FortuneTellerId = $1
            ORDER BY speciality, price DESC;`,
      [fortuneTellerId]
    )

    if (result.rows.length === 0) return null

    const packages: PackageSchema[] = result.rows.map(row => ({

      speciality: row.speciality,
      description: row.description,
      duration: row.duration,
      price: row.price,
      fortuneTellerId: row.fortunetellerid

    }))

    return packages
  },

  getRecommendPackage: async () => {
    const result = await db.query(
      `WITH FILTER_PACKAGE AS (
                SELECT * FROM package
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
             
), 
            INTEGRATE_FORTUNETELLER AS (
                SELECT DISTINCT FA.speciality, FA.packageid, FA.fortunetellerid, FT.stagename, U.fname, U.profilepicture, FT.totalscore, FT.totalreview FROM FILTER_APPOINTMENT FA
                JOIN fortune_teller FT ON FA.fortunetellerid = FT.fortunetellerid
                JOIN user_table U ON FA.fortunetellerid = U.userid
          
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

            SELECT * FROM FORTUNETELLER_PACKAGE ORDER BY RANDOM() LIMIT 4`
    )

    if (result.rows.length === 0) return null
    return result.rows
  }
}
