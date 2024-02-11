import { db } from "../configs/pgdbConnection"
import { PackageSchema } from "../models/package/package.model"

export const packageRepository = {
    getPackageByFortuneTellerId: async (fortuneTellerId: string): Promise< null | PackageSchema[] > =>{
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

        }));

        return packages;
    }
}