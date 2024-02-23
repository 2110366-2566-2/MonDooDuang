import { db } from "../configs/pgdbConnection"
import { PackageSchema, PackageIncludeIdSchema, PackageWithIdSchema } from "../models/package/package.model"
import { SearchSchema } from "../models/search/search.model"

export const packageRepository = {
  createPackage: async (packageFortuneTeller: PackageSchema) => {
    try {
      await db.query(
        `
            INSERT INTO PACKAGE (speciality,description, duration, price, fortune_teller_Id)
            VALUES($1, $2, $3, $4, $5);
        `,
        [packageFortuneTeller.speciality, packageFortuneTeller.description, packageFortuneTeller.duration, packageFortuneTeller.price, packageFortuneTeller.fortuneTellerId]
      )
      return true
    } catch (err) {
      return false
    }
  },
  getPackageData: async (packageId: string) => {
    try {
      const result = await db.query(
        `
        SELECT speciality, duration, price, description
        FROM package
        WHERE package_id = '${packageId}'
        `
      )
      if (result.rows.length === 0) return null
      return {
        speciality: result.rows[0].speciality,
        duration: result.rows[0].duration,
        price: result.rows[0].price,
        description: result.rows[0].description
      }
    } catch (err) {
      return null
    }
  },

  updatePackage: async (packageData: PackageWithIdSchema) => {
    try {
      const result = await db.query(
        `
        UPDATE package
        SET speciality=$2, duration=$3, price=$4, description=$5
        WHERE package_id = $1
        `,
        [packageData.packageId, packageData.speciality, packageData.duration, packageData.price, packageData.description]
      )
      return true
    } catch (err) {
      return false
    }
  },

  deletePackage: async (packageId: string) => {
    try {
      const result = await db.query(
        `
        DELETE FROM PACKAGE
        WHERE package_id ='${packageId}'
        `
      )
      return true
    } catch (err) {
      return false
    }
  },

  getPackageByFortuneTellerId: async (fortuneTellerId: string): Promise< null | PackageSchema[] > => {
    const result = await db.query(
      `SELECT * FROM PACKAGE
            WHERE fortune_teller_id = $1
            ORDER BY speciality, price DESC;`,
      [fortuneTellerId]
    )

    if (result.rows.length === 0) return null

    const packages: PackageSchema[] = result.rows.map(row => ({

      speciality: row.speciality,
      description: row.description,
      duration: row.duration,
      price: row.price,
      fortuneTellerId: row.fortune_teller_id

    }))

    return packages
  },

  getPackageIncludeIdByFortuneTellerId: async (fortuneTellerId: string): Promise< null | PackageIncludeIdSchema[] > => {
    const result = await db.query(
      `SELECT * FROM PACKAGE 
            WHERE fortune_teller_id = $1
            ORDER BY speciality, price DESC;`,
      [fortuneTellerId]
    )

    if (result.rows.length === 0) return null

    const packages: PackageIncludeIdSchema[] = result.rows.map(row => ({

      packageId: row.package_id,
      speciality: row.speciality,
      description: row.description,
      duration: row.duration,
      price: row.price,
      fortuneTellerId: row.fortune_teller_id

    }))

    return packages
  },

  getRecommendPackage: async () => {
    const result = await db.query(
      `WITH FILTER_PACKAGE AS (
                SELECT * FROM package
            ), 
            APPOINTMENT_DATE_RANGE AS(
                SELECT A.appointment_date AS startdate, A.appointment_date + (FP.duration || ' minutes')::interval AS enddate, FP.package_id 
                FROM FILTER_PACKAGE FP
                JOIN appointment A ON FP.package_id = A.package_id
            ), 
            FILTER_APPOINTMENT AS (
                SELECT FP.package_id, FP.speciality, FP.price, FP.fortune_teller_id FROM FILTER_PACKAGE FP
                LEFT OUTER JOIN appointment A ON FP.package_id = A.package_id
                LEFT OUTER JOIN APPOINTMENT_DATE_RANGE R ON FP.package_id = R.package_id
             
), 
            INTEGRATE_FORTUNETELLER AS (
                SELECT DISTINCT FA.speciality, FA.package_id, FA.fortune_teller_id, FT.stage_name, U.fname, U.profile_picture, FT.total_score, FT.total_review FROM FILTER_APPOINTMENT FA
                JOIN fortune_teller FT ON FA.fortune_teller_id = FT.fortune_teller_id
                JOIN user_table U ON FA.fortune_teller_id = U.user_id
          
            ),
            FORTUNETELLER_PACKAGE AS (
                SELECT F.fortune_teller_id, F.stage_name, F.fname, F.profile_picture, 
                F.total_score, F.total_review, 
                STRING_AGG(DISTINCT F.package_id, ',') AS current_packageid,
                STRING_AGG(DISTINCT P.package_id, ',') AS packageid_list,
                ARRAY_TO_STRING(ARRAY_AGG(DISTINCT F.speciality), ',') AS current_speciality,
                ARRAY_TO_STRING(ARRAY_AGG(DISTINCT P.speciality), ',') AS speciality_list,
                MIN(P.price) AS minPrice,
                MAX(P.price) AS maxPrice
                FROM INTEGRATE_FORTUNETELLER F
                JOIN package P ON F.fortune_teller_id = P.fortune_teller_id
                GROUP BY F.fortune_teller_id, F.stage_name, F.fname, F.profile_picture, F.total_score, F.total_review
            )

            SELECT * FROM FORTUNETELLER_PACKAGE ORDER BY RANDOM() LIMIT 4`
    )

    if (result.rows.length === 0) return null
    return result.rows
  }
}
